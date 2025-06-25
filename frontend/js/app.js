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
        document.getElementById('sidebar').style.display = 'none';
        
        // Hide sidebar toggle button on login screen
        const sidebarToggleContainer = document.getElementById('sidebar-toggle-container');
        if (sidebarToggleContainer) {
            sidebarToggleContainer.style.display = 'none';
        }
        // Add login-page class to body
        document.body.classList.add('login-page');
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

    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }

    // Sidebar toggle button for small screens
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('show');
            if (sidebar.classList.contains('show')) {
                sidebar.style.display = 'flex';
            } else {
                sidebar.style.display = 'none';
            }
        });
    }
    
    // Sidebar close button for small screens
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('show');
            sidebar.style.display = 'none';
        });
    }
    
    // Handle window resize to show/hide sidebar on larger screens
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth >= 768 && currentUser) {
            sidebar.style.display = 'flex';
        } else if (!sidebar.classList.contains('show')) {
            sidebar.style.display = 'none';
        }
    });
}

// Handle login form submission
function handleLogin() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (!username || !password) {
        showAlert('Please enter both username and password', 'danger');
        return;
    }
    
    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    // Check if user exists and password is correct
    if (users[username] && users[username].password === password) {
        // Login successful
        currentUser = username;
        currentRole = users[username].role;
        
        // Save to localStorage for auto-login
        localStorage.setItem('currentUser', username);
        localStorage.setItem('currentRole', currentRole);
        
        showAlert(`Welcome back, ${username}!`, 'success');
        showDashboard();
    } else {
        // User doesn't exist or incorrect password
        showAlert('Invalid username or password. Please try again.', 'danger');
    }
}

// Handle signup form submission
function handleSignup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const roleElement = document.querySelector('input[name="signup-role"]:checked');
    
    if (!username || !password) {
        showAlert('Please enter both username and password', 'danger');
        return;
    }
    
    if (!roleElement) {
        showAlert('Please select a role', 'danger');
        return;
    }
    
    const role = parseInt(roleElement.value);
    
    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    // Check if username already exists
    if (users[username]) {
        showAlert('Username already exists. Please choose a different username.', 'danger');
        return;
    }
    
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
}

// Show the dashboard based on user role
function showDashboard() {
    // Hide login, show dashboard
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
    
    // Show sidebar based on screen size
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth >= 768) {
        sidebar.style.display = 'flex';
    } else {
        sidebar.style.display = 'none';
    }
    
    // Show sidebar toggle button on small screens
    const sidebarToggleContainer = document.getElementById('sidebar-toggle-container');
    if (sidebarToggleContainer) {
        sidebarToggleContainer.style.display = 'flex';
        sidebarToggleContainer.style.visibility = 'visible';
    }
    
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
    
    // Add event listeners for logout (both sidebar link and dashboard button)
    document.getElementById('logout-link').addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
    });
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
    
    // Remove login-page class from body
    document.body.classList.remove('login-page');
    
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
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('sidebar').classList.remove('show');
    
    // Hide sidebar toggle button
    const sidebarToggleContainer = document.getElementById('sidebar-toggle-container');
    if (sidebarToggleContainer) {
        sidebarToggleContainer.style.display = 'none';
    }
    
    // Add login-page class to body
    document.body.classList.add('login-page');
    
    // Clear any form inputs
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.reset();
    // Only hide new-user-fields if it exists
    const newUserFields = document.getElementById('new-user-fields');
    if (newUserFields) newUserFields.style.display = 'none';
    
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
