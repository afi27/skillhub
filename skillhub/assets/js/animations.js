// animations.js - All your animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillHub Animations JS Loaded');
    
    // Initialize animations
    initFloatingCards();
    initScrollAnimations();
    initHoverEffects();
    initCounterAnimations();
    initTestimonialFilter();
    initVideoPlayButtons();
});

// ===== FLOATING CARDS ANIMATION =====
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Set initial position
        card.style.transform = 'translateY(0)';
        
        // Add continuous floating animation
        const floatAnimation = () => {
            const time = Date.now() * 0.001;
            const y = Math.sin(time + index) * 10;
            card.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(floatAnimation);
        };
        
        floatAnimation();
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.course-card, .step, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .course-card, .step, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .course-card:nth-child(1) { transition-delay: 0.1s; }
        .course-card:nth-child(2) { transition-delay: 0.2s; }
        .course-card:nth-child(3) { transition-delay: 0.3s; }
        .course-card:nth-child(4) { transition-delay: 0.4s; }
        .course-card:nth-child(5) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.course-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.course-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = counter.textContent.replace(/[0-9]/g, '').replace(/[+,]/g, '');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 16);
}

// ===== TESTIMONIAL FILTER =====
function initTestimonialFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter and animate cards
            testimonialCards.forEach((card, index) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== VIDEO PLAY BUTTONS =====
function initVideoPlayButtons() {
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoCard = this.closest('.video-card');
            const title = videoCard.querySelector('h4').textContent;
            
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                    <h3>${title}</h3>
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle fa-4x"></i>
                        <p>Video preview would play here</p>
                    </div>
                    <p class="modal-text">This is a demo. In the real website, a video player would appear here.</p>
                </div>
            `;
            
            // Style modal
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;
            
            modal.querySelector('.modal-content').style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                position: relative;
                animation: slideUp 0.3s ease;
            `;
            
            modal.querySelector('.video-placeholder').style.cssText = `
                height: 300px;
                background: linear-gradient(45deg, #2563eb, #0d9488);
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                margin: 1.5rem 0;
            `;
            
            modal.querySelector('.modal-close').style.cssText = `
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6b7280;
                cursor: pointer;
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Close modal
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease';
                modal.querySelector('.modal-content').style.animation = 'slideDown 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 300);
            });
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.querySelector('.modal-close').click();
                }
            });
            
            // Add CSS animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes slideDown {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(50px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        });
    });
}

// ===== FORM SUBMISSION ANIMATIONS =====
function handleFormSubmit(form, type = 'contact') {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate API call
    setTimeout(() => {
        // Show success animation
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        submitBtn.style.background = '#10b981';
        
        // Reset form
        form.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 2000);
        
        // Show success message
        showNotification(
            type === 'contact' 
                ? 'Message sent successfully!' 
                : 'Successfully subscribed!',
            'success'
        );
    }, 1500);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon and color
    let icon, bgColor;
    switch(type) {
        case 'success':
            icon = 'fa-check-circle';
            bgColor = '#10b981';
            break;
        case 'error':
            icon = 'fa-exclamation-circle';
            bgColor = '#ef4444';
            break;
        case 'info':
            icon = 'fa-info-circle';
            bgColor = '#3b82f6';
            break;
        default:
            icon = 'fa-bell';
            bgColor = '#6b7280';
    }
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: bgColor,
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: '9999',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add animation styles
    const styleId = 'notification-animations';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s;
                margin-left: auto;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', function() {
    // Add loading animation to hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animate course cards sequentially
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
});

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in core.js
window.SkillHubAnimations = {
    showNotification,
    animateCounter,
    handleFormSubmit
};