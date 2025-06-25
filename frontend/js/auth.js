// Authentication related functions

// Initialize authentication module
document.addEventListener('DOMContentLoaded', function() {
    // Set up authentication-specific event listeners
    setupAuthListeners();
});

// Set up authentication-specific event listeners
function setupAuthListeners() {
    // Password visibility toggle
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        // Add password toggle button
        const passwordContainer = passwordInput.parentElement;
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'btn btn-outline-secondary position-absolute end-0 top-0 h-100';
        toggleButton.innerHTML = '<i class="bi bi-eye"></i>';
        toggleButton.style.zIndex = '5';
        
        passwordContainer.classList.add('position-relative');
        passwordContainer.appendChild(toggleButton);
        
        // Add event listener for toggle
        toggleButton.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.innerHTML = '<i class="bi bi-eye-slash"></i>';
            } else {
                passwordInput.type = 'password';
                this.innerHTML = '<i class="bi bi-eye"></i>';
            }
        });
    }
}

// Simulate backend authentication
function authenticateUser(username, password) {
    // In a real application, this would make an API call to the backend
    // For this frontend demo, we'll simulate by checking localStorage
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[username] && users[username].password === password) {
        return {
            success: true,
            user: users[username]
        };
    }
    
    return {
        success: false,
        message: 'Invalid username or password'
    };
}

// Register a new user
function registerUser(username, password, role) {
    // In a real application, this would make an API call to the backend
    // For this frontend demo, we'll simulate by using localStorage
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    // Check if username already exists
    if (users[username]) {
        return {
            success: false,
            message: 'Username already exists'
        };
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
    
    return {
        success: true,
        user: users[username]
    };
}

// Get user role name
function getRoleName(roleId) {
    switch (roleId) {
        case 1:
            return 'Admin';
        case 2:
            return 'Content Creator';
        case 3:
            return 'Market Analyst';
        default:
            return 'Unknown';
    }
}

// Check if user has permission for an action
function hasPermission(action) {
    // Define permissions based on role
    const permissions = {
        1: ['post', 'delete', 'comment', 'follow', 'unfollow'], // Admin
        2: ['post', 'brandAffiliations', 'sponsoredProducts'], // Content Creator
        3: ['analyzeInstagram', 'analyzeX', 'plotTrends'] // Market Analyst
    };
    
    // Check if current role has permission
    return permissions[currentRole] && permissions[currentRole].includes(action);
}
