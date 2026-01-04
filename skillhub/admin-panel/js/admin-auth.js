/**
 * Admin Authentication Module
 * Handles login, logout, and session management
 */

const AdminAuth = {
    // Default admin credentials
    DEFAULT_ADMINS: [
        { username: 'admin', password: 'admin123', name: 'Administrator' },
        { username: 'superadmin', password: 'skillhub@2024', name: 'Super Admin' }
    ],

    // Initialize authentication
    init: function() {
        this.checkLoginState();
        this.setupEventListeners();
    },

    // Check if user is logged in
    checkLoginState: function() {
        const isLoggedIn = localStorage.getItem('skillhub_admin') === 'true';
        const currentPage = window.location.pathname.split('/').pop();
        
        // If not logged in and not on login page, redirect to login
        if (!isLoggedIn && currentPage !== 'login.html' && currentPage !== 'index.html') {
            window.location.href = 'login.html';
        }
        
        // If logged in and on login page, redirect to dashboard
        if (isLoggedIn && (currentPage === 'login.html' || currentPage === 'index.html')) {
            window.location.href = 'dashboard.html';
        }
    },

    // Setup event listeners for login form
    setupEventListeners: function() {
        const loginForm = document.getElementById('loginForm');
        const togglePassword = document.getElementById('togglePassword');
        
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
        
        if (togglePassword) {
            togglePassword.addEventListener('click', this.togglePasswordVisibility);
        }
        
        // Check for saved credentials
        this.loadSavedCredentials();
    },

    // Handle login form submission
    handleLogin: function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember')?.checked || false;
        
        // Validate credentials
        if (this.validateCredentials(username, password)) {
            this.loginSuccess(username, remember);
        } else {
            this.loginError();
        }
    },

    // Validate admin credentials
    validateCredentials: function(username, password) {
        return this.DEFAULT_ADMINS.some(admin => 
            admin.username === username && admin.password === password
        );
    },

    // Handle successful login
    loginSuccess: function(username, remember) {
        // Save login state
        localStorage.setItem('skillhub_admin', 'true');
        localStorage.setItem('admin_username', username);
        
        if (remember) {
            localStorage.setItem('remember_admin', 'true');
        } else {
            localStorage.removeItem('remember_admin');
        }
        
        // Get admin name
        const admin = this.DEFAULT_ADMINS.find(a => a.username === username);
        if (admin) {
            localStorage.setItem('admin_display_name', admin.name);
        }
        
        // Show success message and redirect
        this.showMessage('Login successful! Redirecting...', 'success');
        
        // Disable login button
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            loginBtn.disabled = true;
        }
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    },

    // Handle login error
    loginError: function() {
        this.showMessage('Invalid username or password!', 'error');
        
        // Clear password field
        const passwordField = document.getElementById('password');
        if (passwordField) {
            passwordField.value = '';
            passwordField.focus();
        }
        
        // Add shake animation
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.classList.add('shake-animation');
            setTimeout(() => {
                loginForm.classList.remove('shake-animation');
            }, 500);
        }
    },

    // Toggle password visibility
    togglePasswordVisibility: function() {
        const passwordField = document.getElementById('password');
        const icon = this.querySelector('i');
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    },

    // Load saved credentials
    loadSavedCredentials: function() {
        const savedUsername = localStorage.getItem('admin_username');
        const savedRemember = localStorage.getItem('remember_admin');
        
        if (savedRemember === 'true' && savedUsername) {
            const usernameField = document.getElementById('username');
            const rememberCheckbox = document.getElementById('remember');
            
            if (usernameField) usernameField.value = savedUsername;
            if (rememberCheckbox) rememberCheckbox.checked = true;
        }
    },

    // Show message to user
    showMessage: function(message, type = 'info') {
        let messageElement = document.getElementById('errorMessage');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'errorMessage';
            messageElement.className = 'message';
            
            const form = document.getElementById('loginForm');
            if (form) {
                form.insertBefore(messageElement, form.querySelector('.form-actions'));
            }
        }
        
        // Set message content and styling
        messageElement.textContent = message;
        messageElement.className = `message message-${type}`;
        messageElement.style.display = 'block';
        
        // Hide message after 3 seconds for errors
        if (type === 'error') {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 3000);
        }
    },

    // Logout function
    logout: function() {
        localStorage.removeItem('skillhub_admin');
        localStorage.removeItem('admin_username');
        localStorage.removeItem('admin_display_name');
        
        // Redirect to login page
        window.location.href = 'login.html';
    },

    // Get current admin info
    getAdminInfo: function() {
        return {
            username: localStorage.getItem('admin_username'),
            name: localStorage.getItem('admin_display_name') || 'Administrator',
            isLoggedIn: localStorage.getItem('skillhub_admin') === 'true'
        };
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    AdminAuth.init();
});

// Make functions globally available
window.logoutAdmin = AdminAuth.logout.bind(AdminAuth);
window.getAdminInfo = AdminAuth.getAdminInfo.bind(AdminAuth);