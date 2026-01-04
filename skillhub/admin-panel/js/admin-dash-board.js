/**
 * Dashboard Module
 * Handles dashboard statistics and charts
 */

const AdminDashboard = {
    // Dashboard data
    stats: {
        totalUsers: 1234,
        totalCourses: 5,
        totalRevenue: 12450,
        totalEnrollments: 2879
    },

    // Recent activities
    activities: [
        {
            id: 1,
            type: 'enrollment',
            title: 'New Enrollment',
            description: 'Ali Ahmed enrolled in Dropshipping course',
            time: '10 min ago',
            icon: 'fa-user-plus'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payment Received',
            description: 'PKR 30,000 for Digital Art course',
            time: '2 hours ago',
            icon: 'fa-credit-card'
        },
        {
            id: 3,
            type: 'course',
            title: 'Course Updated',
            description: 'AI Power-Up course content was updated',
            time: '1 day ago',
            icon: 'fa-book'
        },
        {
            id: 4,
            type: 'user',
            title: 'New Instructor',
            description: 'Sarah Johnson approved as new instructor',
            time: '2 days ago',
            icon: 'fa-user-check'
        }
    ],

    // Initialize dashboard
    init: function() {
        this.loadAdminInfo();
        this.loadStats();
        this.loadActivities();
        this.setupCharts();
        this.setupEventListeners();
    },

    // Load admin information
    loadAdminInfo: function() {
        const adminInfo = getAdminInfo();
        
        // Update welcome message
        const welcomeText = document.getElementById('welcomeText');
        if (welcomeText) {
            welcomeText.textContent = `Welcome back, ${adminInfo.name}!`;
        }
        
        // Update admin name in sidebar
        const adminNameElement = document.getElementById('adminName');
        if (adminNameElement) {
            adminNameElement.textContent = adminInfo.name;
        }
    },

    // Load and display statistics
    loadStats: function() {
        // Update stats cards if they exist
        const statsContainers = {
            'total-users': this.stats.totalUsers,
            'total-courses': this.stats.totalCourses,
            'total-revenue': `$${this.stats.totalRevenue.toLocaleString()}`,
            'total-enrollments': this.stats.totalEnrollments.toLocaleString()
        };
        
        for (const [id, value] of Object.entries(statsContainers)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
    },

    // Load recent activities
    loadActivities: function() {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;
        
        // Clear existing activities
        activityList.innerHTML = '';
        
        // Add activities
        this.activities.forEach(activity => {
            const activityItem = this.createActivityItem(activity);
            activityList.appendChild(activityItem);
        });
    },

    // Create activity item HTML
    createActivityItem: function(activity) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        // Determine icon color based on type
        let iconColorClass = '';
        switch(activity.type) {
            case 'enrollment':
                iconColorClass = 'icon-enrollment';
                break;
            case 'payment':
                iconColorClass = 'icon-payment';
                break;
            case 'course':
                iconColorClass = 'icon-course';
                break;
            case 'user':
                iconColorClass = 'icon-user';
                break;
        }
        
        item.innerHTML = `
            <div class="activity-icon ${iconColorClass}">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
        
        return item;
    },

    // Setup simple charts
    setupCharts: function() {
        // Revenue chart (simulated)
        const revenueChart = document.querySelector('.chart-simulation .chart-bars');
        if (revenueChart) {
            const bars = [70, 85, 60, 90, 75, 95, 80];
            
            revenueChart.innerHTML = '';
            bars.forEach(height => {
                const bar = document.createElement('div');
                bar.className = 'chart-bar';
                bar.style.height = `${height}%`;
                bar.style.background = 'linear-gradient(to top, var(--primary), var(--primary-light))';
                revenueChart.appendChild(bar);
            });
        }
        
        // Enrollments chart
        const enrollChart = document.querySelectorAll('.chart-simulation .chart-bars')[1];
        if (enrollChart) {
            const enrollments = [60, 80, 45, 90];
            const colors = [
                'linear-gradient(to top, #3b82f6, #60a5fa)',
                'linear-gradient(to top, #10b981, #34d399)',
                'linear-gradient(to top, #f59e0b, #fbbf24)',
                'linear-gradient(to top, #8b5cf6, #a78bfa)'
            ];
            
            enrollChart.innerHTML = '';
            enrollments.forEach((height, index) => {
                const bar = document.createElement('div');
                bar.className = 'chart-bar';
                bar.style.height = `${height}%`;
                bar.style.background = colors[index];
                enrollChart.appendChild(bar);
            });
        }
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Notification button
        const notificationBtn = document.querySelector('.btn-icon[title="Notifications"]');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', this.showNotifications);
        }
        
        // View all activities button
        const viewAllBtn = document.querySelector('.btn-outline');
        if (viewAllBtn && viewAllBtn.textContent.includes('View All')) {
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAllActivities();
            });
        }
    },

    // Show notifications (placeholder)
    showNotifications: function() {
        alert('You have 2 unread notifications:\n1. New user registration\n2. Course enrollment');
    },

    // Show all activities (placeholder)
    showAllActivities: function() {
        alert('Showing all activities...\nThis would open a modal with full activity log.');
    },

    // Refresh dashboard data
    refreshData: function() {
        // Simulate API call
        this.showMessage('Refreshing data...', 'info');
        
        setTimeout(() => {
            // Update stats (simulate random changes)
            this.stats.totalUsers += Math.floor(Math.random() * 10);
            this.stats.totalEnrollments += Math.floor(Math.random() * 5);
            this.stats.totalRevenue += Math.floor(Math.random() * 100);
            
            this.loadStats();
            this.showMessage('Data refreshed successfully!', 'success');
        }, 1000);
    },

    // Show message
    showMessage: function(message, type = 'info') {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `dashboard-message message-${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${message}
        `;
        
        // Add to dashboard
        const dashboard = document.querySelector('.admin-main');
        if (dashboard) {
            dashboard.insertBefore(messageEl, dashboard.firstChild);
            
            // Remove after 3 seconds
            setTimeout(() => {
                messageEl.remove();
            }, 3000);
        }
    }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    AdminDashboard.init();
});

// Add refresh function to window
window.refreshDashboard = AdminDashboard.refreshData.bind(AdminDashboard);