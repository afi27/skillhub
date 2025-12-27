// Authentication System for SkillHub
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth JS Loaded');
    
    // Initialize based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'login.html':
            initLogin();
            break;
        case 'signup.html':
            initSignup();
            break;
        case 'dashboard.html':
            initDashboard();
            break;
        case 'profile.html':
            initProfile();
            break;
        default:
            initAuthCommon();
    }
    
    // Initialize common auth features
    initAuthCommon();
});

// ===== COMMON AUTH FUNCTIONS =====
function initAuthCommon() {
    // Show/hide password toggle
    const showPasswordBtns = document.querySelectorAll('.show-password');
    showPasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Load user data if logged in
    loadUserData();
}

// ===== LOGIN PAGE =====
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Clear previous errors
        clearErrors();
        
        // Validate
        let isValid = true;
        
        if (!email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!password) {
            showError('passwordError', 'Password is required');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Simulate login process
        simulateLogin(email, password, rememberMe);
    });
    
    // Social login buttons
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
            showNotification(`Logging in with ${provider}...`, 'info');
            
            // Simulate social login
            setTimeout(() => {
                showNotification(`${provider} login successful!`, 'success');
                // In real app, redirect to dashboard
                // window.location.href = 'dashboard.html';
            }, 1500);
        });
    });
}

// ===== SIGNUP PAGE =====
function initSignup() {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;
    
    // Real-time password strength check
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }
    
    // Add skill functionality
    const addSkillBtn = document.getElementById('addSkill');
    const skillInput = document.getElementById('skillInput');
    const skillsContainer = document.getElementById('skillsContainer');
    
    if (addSkillBtn && skillInput && skillsContainer) {
        addSkillBtn.addEventListener('click', function() {
            const skill = skillInput.value.trim();
            if (skill) {
                addSkillTag(skill, skillsContainer);
                skillInput.value = '';
            }
        });
        
        skillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkillBtn.click();
            }
        });
    }
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            terms: document.getElementById('terms').checked,
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Clear previous errors
        clearErrors();
        
        // Validate
        let isValid = true;
        
        // Name validation
        if (!formData.firstName) {
            showError('firstNameError', 'First name is required');
            isValid = false;
        }
        
        if (!formData.lastName) {
            showError('lastNameError', 'Last name is required');
            isValid = false;
        }
        
        // Email validation
        if (!formData.email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(formData.email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        // Password validation
        const passwordStrength = checkPasswordStrength(formData.password);
        if (passwordStrength < 3) {
            showError('passwordError', 'Password is too weak');
            isValid = false;
        }
        
        if (formData.password !== formData.confirmPassword) {
            showError('confirmError', 'Passwords do not match');
            isValid = false;
        }
        
        if (!formData.terms) {
            showError('termsError', 'You must accept the terms');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Simulate signup process
        simulateSignup(formData);
    });
}

// ===== DASHBOARD PAGE =====
function initDashboard() {
    // Load user data
    const user = getUserData();
    if (user) {
        document.getElementById('userName').textContent = user.name || 'User';
        document.getElementById('userEmail').textContent = user.email || 'user@example.com';
        document.getElementById('greetingName').textContent = user.firstName || 'there';
        
        // Update stats if available
        if (user.stats) {
            document.getElementById('enrolledCount').textContent = user.stats.courses || 3;
            document.getElementById('completedCount').textContent = user.stats.completed || 1;
            document.getElementById('hoursSpent').textContent = user.stats.hours || 24;
            document.getElementById('streakDays').textContent = user.stats.streak || 7;
        }
    }
    
    // Continue buttons
    document.querySelectorAll('.course-item .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseName = this.closest('.course-item').querySelector('h4').textContent;
            showNotification(`Continuing "${courseName}"...`, 'info');
        });
    });
}

// ===== PROFILE PAGE =====
function initProfile() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId + 'Tab') {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Load user data
    const user = getUserData();
    if (user) {
        document.getElementById('profileName').textContent = user.name || 'John Doe';
        document.getElementById('profileEmail').textContent = user.email || 'john@example.com';
        document.getElementById('firstName').value = user.firstName || 'John';
        document.getElementById('lastName').value = user.lastName || 'Doe';
        document.getElementById('email').value = user.email || 'john@example.com';
        document.getElementById('bio').value = user.bio || 'Digital marketing specialist learning AI tools';
    }
    
    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                bio: document.getElementById('bio').value,
                skills: Array.from(document.querySelectorAll('.skill-tag')).map(tag => 
                    tag.textContent.replace('×', '').trim()
                )
            };
            
            saveUserData(userData);
            showNotification('Profile updated successfully!', 'success');
        });
    }
    
    // Avatar change
    const changeAvatarBtn = document.getElementById('changeAvatar');
    const avatarInput = document.getElementById('avatarInput');
    
    if (changeAvatarBtn && avatarInput) {
        changeAvatarBtn.addEventListener('click', () => avatarInput.click());
        
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    showNotification('Image size should be less than 5MB', 'error');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    // In real app, upload to server
                    // For demo, just show success message
                    showNotification('Profile picture updated!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Password form
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmNewPassword').value;
            
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }
            
            if (checkPasswordStrength(newPassword) < 3) {
                showNotification('New password is too weak', 'error');
                return;
            }
            
            showNotification('Password updated successfully!', 'success');
            this.reset();
        });
    }
    
    // Two-factor toggle
    const twoFactorToggle = document.getElementById('twoFactorToggle');
    if (twoFactorToggle) {
        twoFactorToggle.addEventListener('change', function() {
            showNotification(
                this.checked ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled',
                'info'
            );
        });
    }
}

// ===== HELPER FUNCTIONS =====
function simulateLogin(email, password, rememberMe) {
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Mock user data
        const userData = {
            id: 1,
            email: email,
            firstName: email.split('@')[0],
            name: email.split('@')[0],
            token: 'mock-jwt-token-' + Date.now(),
            stats: {
                courses: 3,
                completed: 1,
                hours: 24,
                streak: 7
            }
        };
        
        // Save user data
        localStorage.setItem('skillhub_user', JSON.stringify(userData));
        
        if (rememberMe) {
            localStorage.setItem('skillhub_remember', 'true');
        }
        
        // Show success
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        submitBtn.style.background = '#10b981';
        
        showNotification('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    }, 2000);
}

function simulateSignup(formData) {
    const submitBtn = document.querySelector('#signupForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Create user data
        const userData = {
            id: Date.now(),
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            name: `${formData.firstName} ${formData.lastName}`,
            token: 'mock-jwt-token-' + Date.now(),
            subscribed: formData.newsletter,
            createdAt: new Date().toISOString()
        };
        
        // Save user data
        localStorage.setItem('skillhub_user', JSON.stringify(userData));
        
        // Show success
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Account created!';
        submitBtn.style.background = '#10b981';
        
        showNotification('Account created successfully! Redirecting to dashboard...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    }, 2500);
}

function updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const strength = checkPasswordStrength(password);
    const strengthBar = document.getElementById('strengthLevel');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthBar || !strengthText) return;
    
    let width = 0;
    let text = 'Weak';
    let color = '#ef4444';
    
    switch(strength) {
        case 1:
            width = 25;
            text = 'Weak';
            color = '#ef4444';
            break;
        case 2:
            width = 50;
            text = 'Fair';
            color = '#f59e0b';
            break;
        case 3:
            width = 75;
            text = 'Good';
            color = '#10b981';
            break;
        case 4:
            width = 100;
            text = 'Strong';
            color = '#10b981';
            break;
    }
    
    strengthBar.style.width = width + '%';
    strengthBar.style.background = color;
    strengthText.textContent = text;
    strengthText.style.color = color;
}

function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

function addSkillTag(skill, container) {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.innerHTML = `${skill}<i class="fas fa-times"></i>`;
    
    tag.querySelector('i').addEventListener('click', function() {
        container.removeChild(tag);
    });
    
    container.appendChild(tag);
}

function loadUserData() {
    const userData = localStorage.getItem('skillhub_user');
    return userData ? JSON.parse(userData) : null;
}

function saveUserData(userData) {
    const existingData = loadUserData() || {};
    const updatedData = { ...existingData, ...userData };
    localStorage.setItem('skillhub_user', JSON.stringify(updatedData));
}

function getUserData() {
    return loadUserData();
}

function handleLogout() {
    // Clear user data
    localStorage.removeItem('skillhub_user');
    
    showNotification('Logged out successfully', 'success');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Use the notification function from core.js if available
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Fallback notification
        alert(message);
    }
}