// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Global variables
let currentUser = null;
let currentRole = null;

// Initialize the application
function initApp() {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('currentRole');
    
    if (savedUser && savedRole) {
        // Auto-login with saved credentials
        currentUser = savedUser;
        currentRole = parseInt(savedRole);
        showDashboard();
    } else {
        // Show login form
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('dashboard-container').style.display = 'none';
        document.getElementById('sidebar').classList.remove('d-md-block');
        document.getElementById('sidebar').classList.add('d-none');
    }

    // Set up event listeners
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Username input for checking if new user
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            checkIfNewUser(this.value);
        });
    }
}

// Check if username exists in the system
function checkIfNewUser(username) {
    // In a real application, this would make an API call to the backend
    // For this frontend demo, we'll simulate by checking localStorage
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (username && username.trim() !== '' && !users[username]) {
        // New user - show role selection
        document.getElementById('new-user-fields').style.display = 'block';
    } else {
        // Existing user - hide role selection
        document.getElementById('new-user-fields').style.display = 'none';
    }
}

// Handle login form submission
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showAlert('Please enter both username and password', 'danger');
        return;
    }
    
    // Get existing users from localStorage or create empty object
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    // Check if new user
    if (!users[username]) {
        // New user - register
        const roleElement = document.querySelector('input[name="role"]:checked');
        if (!roleElement) {
            showAlert('Please select a role', 'danger');
            return;
        }
        
        const role = parseInt(roleElement.value);
        
        // Create new user
        users[username] = {
            username: username,
            password: password, // In a real app, this would be hashed
            role: role,
            profiles: {
                instagram: {
                    followers: 100,
                    following: 50,
                    posts: []
                },
                x: {
                    followers: 100,
                    following: 50,
                    posts: []
                }
            }
        };
        
        // If content creator, add brand affiliations and sponsored products
        if (role === 2) {
            users[username].brandAffiliations = ['Nike', 'Apple'];
            users[username].productSponsored = [];
        }
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Set current user and role
        currentUser = username;
        currentRole = role;
        
        // Save to localStorage for auto-login
        localStorage.setItem('currentUser', username);
        localStorage.setItem('currentRole', role);
        
        showAlert(`Welcome, ${username}! Your account has been created.`, 'success');
        showDashboard();
    } else {
        // Existing user - verify password
        if (users[username].password === password) {
            // Login successful
            currentUser = username;
            currentRole = users[username].role;
            
            // Save to localStorage for auto-login
            localStorage.setItem('currentUser', username);
            localStorage.setItem('currentRole', currentRole);
            
            showAlert(`Welcome back, ${username}!`, 'success');
            showDashboard();
        } else {
            // Incorrect password
            showAlert('Incorrect password. Please try again.', 'danger');
        }
    }
}

// Show the dashboard based on user role
function showDashboard() {
    // Hide login, show dashboard
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
    document.getElementById('sidebar').classList.remove('d-none');
    document.getElementById('sidebar').classList.add('d-md-block');
    
    // Update user info in sidebar
    document.getElementById('user-info').textContent = currentUser;
    
    // Clear sidebar menu
    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.innerHTML = '';
    
    // Add logout option to sidebar
    const logoutItem = document.createElement('li');
    logoutItem.className = 'nav-item';
    logoutItem.innerHTML = `
        <a class="nav-link" href="#" id="logout-link">
            <i class="bi bi-box-arrow-right"></i> Logout
        </a>
    `;
    sidebarMenu.appendChild(logoutItem);
    
    // Add event listener for logout
    document.getElementById('logout-link').addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
    });
    
    // Load dashboard based on role
    switch (currentRole) {
        case 1: // Admin
            loadAdminDashboard();
            break;
        case 2: // Content Creator
            loadCreatorDashboard();
            break;
        case 3: // Market Analyst
            loadAnalystDashboard();
            break;
        default:
            showAlert('Unknown user role', 'danger');
    }
}

// Handle logout
function handleLogout() {
    // Clear current user data
    currentUser = null;
    currentRole = null;
    
    // Remove from localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    
    // Show login form
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('dashboard-container').style.display = 'none';
    document.getElementById('sidebar').classList.remove('d-md-block');
    document.getElementById('sidebar').classList.add('d-none');
    
    // Clear any form inputs
    document.getElementById('login-form').reset();
    document.getElementById('new-user-fields').style.display = 'none';
    
    showAlert('You have been logged out successfully', 'info');
}

// Show alert message
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find container to add alert to
    let container;
    if (document.getElementById('dashboard-container').style.display === 'none') {
        // Login page
        container = document.querySelector('#login-container .card-body');
        container.insertBefore(alertDiv, container.firstChild);
    } else {
        // Dashboard page
        container = document.getElementById('dashboard-content');
        container.insertBefore(alertDiv, container.firstChild);
    }
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
}

// Get user data
function getUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return users[currentUser] || null;
}

// Save user data
function saveUserData(userData) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[currentUser] = userData;
    localStorage.setItem('users', JSON.stringify(users));
}

// Show modal with dynamic content
function showModal(title, content) {
    const modalTitle = document.getElementById('actionModalLabel');
    const modalContent = document.getElementById('modal-content');
    
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    
    const modal = new bootstrap.Modal(document.getElementById('actionModal'));
    modal.show();
}
