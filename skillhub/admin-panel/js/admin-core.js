/**
 * Core Admin Functions Module
 * Handles common functionality across admin panel
 */

const AdminCore = {
    // Initialize core functionality
    init: function() {
        this.setupSidebar();
        this.setupTheme();
        this.setupResponsive();
        this.setupNotifications();
        this.setupBackToTop();
        this.loadAdminInfo();
    },

    // Setup sidebar functionality
    setupSidebar: function() {
        const sidebar = document.querySelector('.admin-sidebar');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (!sidebar || !menuToggle) return;
        
        // Toggle sidebar on menu button click
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('sidebar-active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const isMobile = window.innerWidth <= 992;
            const isSidebarActive = sidebar.classList.contains('active');
            const clickedInsideSidebar = sidebar.contains(e.target);
            const clickedMenuToggle = menuToggle.contains(e.target) || e.target === menuToggle;
            
            if (isMobile && isSidebarActive && !clickedInsideSidebar && !clickedMenuToggle) {
                sidebar.classList.remove('active');
                document.body.classList.remove('sidebar-active');
            }
        });
        
        // Highlight active navigation item
        this.highlightActiveNav();
    },

    // Highlight active navigation item
    highlightActiveNav: function() {
        const currentPage = window.location.pathname.split('/').pop();
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'dashboard.html') ||
                (currentPage === 'index.html' && href === 'dashboard.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    },

    // Setup theme switching (light/dark)
    setupTheme: function() {
        // Check for saved theme
        const savedTheme = localStorage.getItem('admin_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Setup theme toggle button if exists
        const themeToggle = document.querySelector('.btn-icon[onclick*="toggleTheme"]');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme);
        }
    },

    // Toggle between light and dark theme
    toggleTheme: function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('admin_theme', newTheme);
        
        // Update icon
        const icon = this.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    },

    // Setup responsive behaviors
    setupResponsive: function() {
        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Initial check
        this.handleResize();
    },

    // Handle window resize
    handleResize: function() {
        const sidebar = document.querySelector('.admin-sidebar');
        const isMobile = window.innerWidth <= 992;
        
        if (isMobile) {
            sidebar?.classList.remove('active');
            document.body.classList.remove('sidebar-active');
        } else {
            sidebar?.classList.add('active');
            document.body.classList.add('sidebar-active');
        }
    },

    // Setup notifications
    setupNotifications: function() {
        // Check for unread notifications (simulated)
        const unreadCount = this.getUnreadNotifications();
        this.updateNotificationBadge(unreadCount);
        
        // Setup notification click handler
        const notificationBtn = document.querySelector('.btn-icon[title*="Notification"]');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', this.showNotificationDropdown.bind(this));
        }
    },

    // Get unread notifications count (simulated)
    getUnreadNotifications: function() {
        // In real app, this would be from API
        return Math.floor(Math.random() * 5);
    },

    // Update notification badge
    updateNotificationBadge: function(count) {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            if (count > 0) {
                badge.textContent = count > 9 ? '9+' : count;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    },

    // Show notification dropdown
    showNotificationDropdown: function() {
        // Create notification dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <h4>Notifications</h4>
                <button class="btn-sm btn-outline">Mark all as read</button>
            </div>
            <div class="dropdown-content">
                <div class="notification-item unread">
                    <i class="fas fa-user-plus"></i>
                    <div>
                        <strong>New user registered</strong>
                        <p>Ali Ahmed just signed up</p>
                        <span>2 min ago</span>
                    </div>
                </div>
                <div class="notification-item unread">
                    <i class="fas fa-credit-card"></i>
                    <div>
                        <strong>Payment received</strong>
                        <p>PKR 40,000 for Digital Art course</p>
                        <span>1 hour ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <i class="fas fa-book"></i>
                    <div>
                        <strong>Course updated</strong>
                        <p>Dropshipping course content updated</p>
                        <span>1 day ago</span>
                    </div>
                </div>
            </div>
            <div class="dropdown-footer">
                <a href="#">View all notifications</a>
            </div>
        `;
        
        // Position and show dropdown
        const btn = this;
        const rect = btn.getBoundingClientRect();
        dropdown.style.position = 'fixed';
        dropdown.style.top = rect.bottom + 'px';
        dropdown.style.right = (window.innerWidth - rect.right) + 'px';
        
        document.body.appendChild(dropdown);
        
        // Close dropdown when clicking outside
        const closeDropdown = (e) => {
            if (!dropdown.contains(e.target) && e.target !== btn) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeDropdown);
        }, 100);
    },

    // Setup back to top button
    setupBackToTop: function() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.style.display = 'none';
        
        document.body.appendChild(backToTop);
        
        // Show/hide button based on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        // Scroll to top when clicked
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    // Load admin information
    loadAdminInfo: function() {
        const adminInfo = getAdminInfo ? getAdminInfo() : { name: 'Administrator' };
        
        // Update admin name in sidebar
        const adminNameElements = document.querySelectorAll('#adminName, .user-details h4');
        adminNameElements.forEach(el => {
            if (el.id === 'adminName' || el.classList.contains('user-details')) {
                el.textContent = adminInfo.name;
            }
        });
        
        // Update welcome text
        const welcomeText = document.getElementById('welcomeText');
        if (welcomeText) {
            welcomeText.textContent = `Welcome back, ${adminInfo.name}!`;
        }
    },

    // Show confirmation dialog
    confirmAction: function(message, callback) {
        if (confirm(message)) {
            if (typeof callback === 'function') {
                callback();
            }
            return true;
        }
        return false;
    },

    // Show loading spinner
    showLoading: function(show = true, message = 'Loading...') {
        let spinner = document.getElementById('global-spinner');
        
        if (show) {
            if (!spinner) {
                spinner = document.createElement('div');
                spinner.id = 'global-spinner';
                spinner.className = 'global-spinner';
                spinner.innerHTML = `
                    <div class="spinner-content">
                        <div class="spinner"></div>
                        <p>${message}</p>
                    </div>
                `;
                document.body.appendChild(spinner);
            }
            spinner.style.display = 'flex';
        } else if (spinner) {
            spinner.style.display = 'none';
        }
    },

    // Show toast message
    showToast: function(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${this.getToastIcon(type)}"></i>
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
        
        // Auto remove
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);
    },

    // Get icon for toast type
    getToastIcon: function(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    },

    // Format date
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Format currency
    formatCurrency: function(amount, currency = 'PKR') {
        return `${currency} ${amount.toLocaleString()}`;
    },

    // Copy to clipboard
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            this.showToast('Failed to copy', 'error');
        });
    }
};

// Initialize core functionality
document.addEventListener('DOMContentLoaded', function() {
    AdminCore.init();
});

// Make functions globally available
window.toggleSidebar = () => {
    const sidebar = document.querySelector('.admin-sidebar');
    if (sidebar) sidebar.classList.toggle('active');
};

window.toggleTheme = AdminCore.toggleTheme.bind(AdminCore);
window.showLoading = AdminCore.showLoading.bind(AdminCore);
window.showToast = AdminCore.showToast.bind(AdminCore);
window.formatDate = AdminCore.formatDate.bind(AdminCore);
window.formatCurrency = AdminCore.formatCurrency.bind(AdminCore);
window.copyToClipboard = AdminCore.copyToClipboard.bind(AdminCore);