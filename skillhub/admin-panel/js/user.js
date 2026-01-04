// Admin Users JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Users management loaded');
    
    // ===== ADD USER MODAL =====
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            openModal('addUserModal');
        });
    }
    
    // ===== USER FORM VALIDATION =====
    const userForm = document.getElementById('userForm');
    if (userForm) {
        const passwordInput = userForm.querySelector('input[type="password"]');
        const confirmPasswordInput = userForm.querySelectorAll('input[type="password"]')[1];
        
        // Password match validation
        function validatePasswords() {
            if (passwordInput.value && confirmPasswordInput.value) {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    confirmPasswordInput.style.borderColor = '#ef4444';
                    return false;
                } else {
                    confirmPasswordInput.style.borderColor = '#10b981';
                    return true;
                }
            }
            return true;
        }
        
        passwordInput.addEventListener('input', validatePasswords);
        confirmPasswordInput.addEventListener('input', validatePasswords);
        
        // Email validation
        const emailInput = userForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '';
                }
            });
        }
    }
    
    // ===== USER STATUS MANAGEMENT =====
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const currentStatus = this.textContent;
            let newStatus, newClass, action;
            
            switch(currentStatus) {
                case 'Active':
                    newStatus = 'Suspended';
                    newClass = 'status-inactive';
                    action = 'suspend';
                    break;
                case 'Pending':
                    newStatus = 'Active';
                    newClass = 'status-active';
                    action = 'activate';
                    break;
                case 'Suspended':
                    newStatus = 'Active';
                    newClass = 'status-active';
                    action = 'reactivate';
                    break;
                default:
                    return;
            }
            
            this.textContent = newStatus;
            this.className = `status-badge ${newClass}`;
            
            showNotification(`User ${action}d successfully`, 'success');
        });
    });
    
    // ===== BULK USER ACTIONS =====
    const bulkUserActions = {
        selectAll: function() {
            const selectAll = document.querySelector('thead .select-all');
            if (selectAll) {
                selectAll.addEventListener('change', function() {
                    const checkboxes = document.querySelectorAll('tbody .row-select');
                    checkboxes.forEach(cb => cb.checked = this.checked);
                });
            }
        },
        
        activateSelected: function() {
            const activateBtn = document.querySelector('[data-action="activate-users"]');
            if (activateBtn) {
                activateBtn.addEventListener('click', function() {
                    const selected = document.querySelectorAll('tbody .row-select:checked');
                    if (selected.length > 0) {
                        selected.forEach(checkbox => {
                            const row = checkbox.closest('tr');
                            const statusBadge = row.querySelector('.status-badge');
                            if (statusBadge && statusBadge.textContent !== 'Active') {
                                statusBadge.textContent = 'Active';
                                statusBadge.className = 'status-badge status-active';
                            }
                        });
                        showNotification(`${selected.length} user(s) activated`, 'success');
                    }
                });
            }
        },
        
        sendEmail: function() {
            const emailBtn = document.querySelector('[data-action="send-email"]');
            if (emailBtn) {
                emailBtn.addEventListener('click', function() {
                    const selected = document.querySelectorAll('tbody .row-select:checked');
                    if (selected.length > 0) {
                        showNotification(`Email sent to ${selected.length} user(s)`, 'success');
                    }
                });
            }
        }
    };
    
    bulkUserActions.selectAll();
    bulkUserActions.activateSelected();
    bulkUserActions.sendEmail();
    
    // ===== USER SEARCH =====
    const searchInput = document.querySelector('.table-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('tbody tr');
            let visibleCount = 0;
            
            rows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                if (rowText.includes(searchTerm)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Update table info
            const tableInfo = document.querySelector('.table-info');
            if (tableInfo) {
                tableInfo.textContent = `Showing ${visibleCount} of ${rows.length} users`;
            }
        });
    }
    
    // ===== USER STATS CALCULATION =====
    function calculateUserStats() {
        const rows = document.querySelectorAll('tbody tr');
        let activeUsers = 0;
        let pendingUsers = 0;
        let suspendedUsers = 0;
        let totalStudents = 0;
        
        rows.forEach(row => {
            const statusBadge = row.querySelector('.status-badge');
            const roleCell = row.children[2];
            const coursesCell = row.children[4];
            
            if (statusBadge) {
                const status = statusBadge.textContent;
                if (status === 'Active') activeUsers++;
                else if (status === 'Pending') pendingUsers++;
                else if (status === 'Suspended') suspendedUsers++;
            }
            
            if (roleCell && roleCell.textContent.includes('Student')) {
                totalStudents++;
            }
        });
        
        updateUserStatsDisplay(activeUsers, pendingUsers, suspendedUsers, totalStudents);
    }
    
    function updateUserStatsDisplay(active, pending, suspended, students) {
        const stats = {
            active: document.querySelector('[data-stat="active-users"]'),
            pending: document.querySelector('[data-stat="pending-users"]'),
            suspended: document.querySelector('[data-stat="suspended-users"]'),
            students: document.querySelector('[data-stat="total-students"]')
        };
        
        if (stats.active) stats.active.textContent = active;
        if (stats.pending) stats.pending.textContent = pending;
        if (stats.suspended) stats.suspended.textContent = suspended;
        if (stats.students) stats.students.textContent = students;
    }
    
    calculateUserStats();
    
    // ===== USER ROLE MANAGEMENT =====
    const roleTags = document.querySelectorAll('.tag');
    roleTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const currentRole = this.textContent;
            const newRole = currentRole === 'Student' ? 'Instructor' : 
                           currentRole === 'Instructor' ? 'Admin' : 'Student';
            
            this.textContent = newRole;
            
            // Update color based on role
            switch(newRole) {
                case 'Student':
                    this.style.background = '#dbeafe';
                    this.style.color = '#1e40af';
                    break;
                case 'Instructor':
                    this.style.background = '#fef3c7';
                    this.style.color = '#92400e';
                    break;
                case 'Admin':
                    this.style.background = '#dcfce7';
                    this.style.color = '#166534';
                    break;
            }
            
            showNotification(`User role changed to ${newRole}`, 'success');
        });
    });
    
    // ===== EXPORT FUNCTIONALITY =====
    const exportBtn = document.querySelector('[data-action="export-users"]');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
            this.disabled = true;
            
            // Simulate export process
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-download"></i> Export Users';
                this.disabled = false;
                
                // Create and trigger download
                const data = "Name,Email,Role,Status\nJohn Doe,john@email.com,Student,Active\n";
                const blob = new Blob([data], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'users_export.csv';
                a.click();
                
                showNotification('Users exported successfully', 'success');
            }, 1500);
        });
    }
    
    // ===== USER VERIFICATION =====
    const verifyBtns = document.querySelectorAll('[data-action="verify"]');
    verifyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const statusBadge = row.querySelector('.status-badge');
            
            if (statusBadge && statusBadge.textContent === 'Pending') {
                statusBadge.textContent = 'Active';
                statusBadge.className = 'status-badge status-active';
                this.innerHTML = '<i class="fas fa-check"></i> Verified';
                this.disabled = true;
                showNotification('User verified successfully', 'success');
            }
        });
    });
    
    // ===== PAGINATION ENHANCEMENT =====
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // Show loading state
                const tableBody = document.querySelector('tbody');
                tableBody.style.opacity = '0.5';
                
                setTimeout(() => {
                    // Update active page
                    document.querySelectorAll('.pagination-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Restore opacity
                    tableBody.style.opacity = '1';
                    
                    showNotification(`Loaded page ${this.textContent}`, 'info');
                }, 500);
            }
        });
    });
});