// Core JavaScript for SkillHub
document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillHub Core JS Loaded');
    
    // Initialize all core features
    initThemeToggle();
    initMobileMenu();
    initBackToTop();
    initContactForm();
    initFAQ();
    initNewsletterForm();
    initCourseEnrollment();
    animateCounters();
    initFormValidation();
});

// script.js
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});


// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle?.querySelector('i');
    
    if (!themeToggle) return;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('skillhub-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (icon) icon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (icon) {
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('skillhub-theme', 'dark');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('skillhub-theme', 'light');
            }
        }
        
        // Animation
        themeToggle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 300);
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        
        // Update icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = navMenu.classList.contains('active') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
    
    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            subject: this.querySelector('#subject').value,
            message: this.querySelector('#message').value
        };
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! We\'ll respond within 24 hours.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== FAQ TOGGLE =====
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
        
        }
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Find user
  const user = accounts.find(acc => acc.email === email && acc.password === password);

  if (!user) {
    alert("Invalid email or password!");
    return;
  }

  // Save user info in localStorage
  localStorage.setItem('skillhub_user', JSON.stringify(user));
  localStorage.setItem('skillhub_loggedIn', 'true');

  // Redirect based on role
  if (user.role === "admin") {
    window.location.href = "admin-panel.html"; // admin dashboard
  } else {
    window.location.href = "user-profile.html"; // regular user profile
  }
});
