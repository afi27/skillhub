// auth.js - Authentication functionality

document.addEventListener('DOMContentLoaded', function() {
    // Show/Hide Password functionality
    const showPasswordBtn = document.getElementById('showPassword');
    const passwordInput = document.getElementById('password');
    
    if (showPasswordBtn && passwordInput) {
        showPasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const eyeIcon = this.querySelector('i');
            if (type === 'text') {
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Simple validation
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            // Email validation
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Password validation
            if (!password) {
                document.getElementById('passwordError').textContent = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Simulate login process
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Save user to localStorage
                const userData = {
                    name: "John Doe",
                    email: email,
                    isLoggedIn: true,
                    rememberMe: rememberMe
                };
                
                localStorage.setItem('skillhub_user', JSON.stringify(userData));
                localStorage.setItem('skillhub_loggedIn', 'true');
                
                // Update button
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Login Successful!';
                submitBtn.style.background = '#10b981';
                
                // Redirect to profile page after 1 second
                setTimeout(() => {
                    window.location.href = 'user-profile.html';
                }, 1000);
                
            }, 1500);
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
            alert(`Redirecting to ${provider} login...`);
            // Here you would normally redirect to OAuth provider
        });
    });
    
    // Forgot password link
    const forgotLink = document.querySelector('.forgot-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Please enter your email for password reset:');
            if (email) {
                alert(`Password reset link sent to ${email}`);
            }
        });
    }
});
