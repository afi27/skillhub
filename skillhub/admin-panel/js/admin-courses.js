/**
 * Courses Management Module
 * Handles CRUD operations for courses
 */

const AdminCourses = {
    // Sample courses data (matching your 5 courses)
    courses: [
        {
            id: 1,
            name: 'Start Dropshipping',
            category: 'Business',
            price: 30000,
            enrollments: 450,
            status: 'active',
            description: 'Build a profitable online store without inventory. Learn sourcing, marketing, and scaling.',
            duration: '6 Weeks',
            level: 'Beginner',
            icon: 'fa-shipping-fast',
            badge: 'Most Popular'
        },
        {
            id: 2,
            name: 'Digital Art Pro',
            category: 'Creative',
            price: 40000,
            enrollments: 320,
            status: 'active',
            description: 'Master Procreate and digital illustration. From basics to professional artwork.',
            duration: '8 Weeks',
            level: 'All Levels',
            icon: 'fa-palette',
            badge: 'Creative'
        },
        {
            id: 3,
            name: 'Podcast in a Week',
            category: 'Audio',
            price: 8000,
            enrollments: 180,
            status: 'active',
            description: 'Launch your podcast from zero. Equipment, editing, distribution, and monetization.',
            duration: '1 Week',
            level: 'Beginner',
            icon: 'fa-podcast',
            badge: 'Fast Track'
        },
        {
            id: 4,
            name: 'AI Power-Up',
            category: 'Technology',
            price: 25000,
            enrollments: 560,
            status: 'active',
            description: 'Leverage AI tools for business & creativity. ChatGPT, Midjourney, and automation.',
            duration: '4 Weeks',
            level: 'Intermediate',
            icon: 'fa-robot',
            badge: 'Trending'
        },
        {
            id: 5,
            name: 'Phone to Film',
            category: 'Video',
            price: 20000,
            enrollments: 290,
            status: 'active',
            description: 'Create professional videos with your smartphone. Shooting, editing, and storytelling.',
            duration: '5 Weeks',
            level: 'Beginner',
            icon: 'fa-video',
            badge: 'New'
        }
    ],

    // Categories for filtering
    categories: ['All', 'Business', 'Creative', 'Technology', 'Audio', 'Video'],

    // Initialize courses module
    init: function() {
        this.loadCourses();
        this.setupEventListeners();
        this.setupSearch();
    },

    // Load and display courses
    loadCourses: function() {
        const tableBody = document.querySelector('tbody');
        if (!tableBody) return;
        
        // Clear existing rows
        tableBody.innerHTML = '';
        
        // Add each course to table
        this.courses.forEach(course => {
            const row = this.createCourseRow(course);
            tableBody.appendChild(row);
        });
        
        // Update course count
        this.updateCourseCount();
    },

    // Create table row for a course
    createCourseRow: function(course) {
        const row = document.createElement('tr');
        
        // Determine color based on category
        let color = '';
        switch(course.category) {
            case 'Business': color = '#3b82f6'; break;
            case 'Creative': color = '#f59e0b'; break;
            case 'Technology': color = '#8b5cf6'; break;
            case 'Audio': color = '#10b981'; break;
            case 'Video': color = '#ef4444'; break;
        }
        
        row.innerHTML = `
            <td>
                <div class="course-info">
                    <div class="course-thumb-small">
                        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${color}, ${this.lightenColor(color, 20)});"></div>
                    </div>
                    <div>
                        <strong>${course.name}</strong>
                        <p style="font-size: 13px; color: var(--gray-600); margin-top: 3px;">${course.description.substring(0, 50)}...</p>
                    </div>
                </div>
            </td>
            <td>${course.category}</td>
            <td>${course.enrollments.toLocaleString()}</td>
            <td>PKR ${course.price.toLocaleString()}</td>
            <td><span class="status-badge status-${course.status}">${this.capitalizeFirst(course.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-sm btn-edit" data-id="${course.id}" onclick="AdminCourses.editCourse(${course.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-sm btn-delete" data-id="${course.id}" onclick="AdminCourses.deleteCourse(${course.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        return row;
    },

    // Update course count display
    updateCourseCount: function() {
        const countElements = document.querySelectorAll('.badge, .welcome-text, .stat-content h3');
        countElements.forEach(element => {
            if (element.textContent.includes('5') || element.classList.contains('badge')) {
                element.textContent = this.courses.length;
            }
        });
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Add course button
        const addBtn = document.querySelector('.btn-primary');
        if (addBtn && addBtn.innerHTML.includes('Add Course')) {
            addBtn.addEventListener('click', this.showAddCourseModal.bind(this));
        }
        
        // Filter button
        const filterBtn = document.querySelector('.btn-outline');
        if (filterBtn && filterBtn.innerHTML.includes('Filter')) {
            filterBtn.addEventListener('click', this.showFilterModal.bind(this));
        }
        
        // Export button
        const exportBtn = document.querySelector('.btn-outline');
        if (exportBtn && exportBtn.innerHTML.includes('Export')) {
            exportBtn.addEventListener('click', this.exportCourses.bind(this));
        }
        
        // Modal close buttons
        const closeBtns = document.querySelectorAll('.btn-icon[onclick*="close"]');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', this.closeModal.bind(this));
        });
        
        // Form submission
        const courseForm = document.getElementById('courseForm');
        if (courseForm) {
            courseForm.addEventListener('submit', this.handleCourseForm.bind(this));
        }
    },

    // Setup search functionality
    setupSearch: function() {
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchCourses(e.target.value);
            });
        }
    },

    // Search courses
    searchCourses: function(query) {
        const filtered = this.courses.filter(course => 
            course.name.toLowerCase().includes(query.toLowerCase()) ||
            course.category.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displayFilteredCourses(filtered);
    },

    // Display filtered courses
    displayFilteredCourses: function(courses) {
        const tableBody = document.querySelector('tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        courses.forEach(course => {
            const row = this.createCourseRow(course);
            tableBody.appendChild(row);
        });
        
        // Update showing text
        const showingText = document.querySelector('.pagination div:first-child');
        if (showingText) {
            showingText.textContent = `Showing 1 to ${courses.length} of ${courses.length} courses`;
        }
    },

    // Show add course modal
    showAddCourseModal: function() {
        const modal = document.getElementById('addCourseModal');
        if (modal) {
            modal.style.display = 'block';
            document.getElementById('courseForm').reset();
            document.getElementById('courseForm').dataset.mode = 'add';
        }
    },

    // Show filter modal
    showFilterModal: function() {
        alert('Filter modal would open here\nCategories: Business, Creative, Technology, Audio, Video');
    },

    // Close modal
    closeModal: function() {
        const modal = document.getElementById('addCourseModal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // Handle course form submission
    handleCourseForm: function(e) {
        e.preventDefault();
        
        const form = e.target;
        const mode = form.dataset.mode || 'add';
        const courseId = form.dataset.courseId;
        
        const courseData = {
            name: document.getElementById('courseName').value,
            category: document.getElementById('courseCategory').value,
            price: parseInt(document.getElementById('coursePrice').value),
            description: document.getElementById('courseDescription').value,
            status: 'active'
        };
        
        if (mode === 'add') {
            this.addCourse(courseData);
        } else {
            this.updateCourse(courseId, courseData);
        }
        
        this.closeModal();
        this.loadCourses();
    },

    // Add new course
    addCourse: function(courseData) {
        const newCourse = {
            id: this.courses.length + 1,
            ...courseData,
            enrollments: 0,
            duration: '4 Weeks',
            level: 'Beginner',
            icon: 'fa-book',
            badge: 'New'
        };
        
        this.courses.push(newCourse);
        this.showMessage('Course added successfully!', 'success');
    },

    // Edit course
    editCourse: function(id) {
        const course = this.courses.find(c => c.id === id);
        if (!course) return;
        
        const modal = document.getElementById('addCourseModal');
        if (modal) {
            modal.style.display = 'block';
            
            // Fill form with course data
            document.getElementById('courseName').value = course.name;
            document.getElementById('courseCategory').value = course.category;
            document.getElementById('coursePrice').value = course.price;
            document.getElementById('courseDescription').value = course.description;
            
            // Set form mode
            const form = document.getElementById('courseForm');
            form.dataset.mode = 'edit';
            form.dataset.courseId = id;
        }
    },

    // Update course
    updateCourse: function(id, courseData) {
        const index = this.courses.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            this.courses[index] = { ...this.courses[index], ...courseData };
            this.showMessage('Course updated successfully!', 'success');
        }
    },

    // Delete course
    deleteCourse: function(id) {
        if (confirm('Are you sure you want to delete this course?')) {
            const index = this.courses.findIndex(c => c.id === id);
            if (index !== -1) {
                this.courses.splice(index, 1);
                this.showMessage('Course deleted successfully!', 'success');
                this.loadCourses();
            }
        }
    },

    // Export courses to CSV
    exportCourses: function() {
        let csv = 'Course Name,Category,Enrollments,Price,Status,Description\n';
        
        this.courses.forEach(course => {
            csv += `"${course.name}","${course.category}",${course.enrollments},${course.price},"${course.status}","${course.description}"\n`;
        });
        
        // Create download link
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'skillhub-courses.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.showMessage('Courses exported successfully!', 'success');
    },

    // Helper function to lighten color
    lightenColor: function(color, percent) {
        // Simplified color lightening for demo
        return color; // In real app, implement proper color manipulation
    },

    // Helper function to capitalize first letter
    capitalizeFirst: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // Show message
    showMessage: function(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `course-message message-${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${message}
        `;
        
        const table = document.querySelector('.data-table');
        if (table) {
            table.insertBefore(messageEl, table.firstChild);
            
            setTimeout(() => {
                messageEl.remove();
            }, 3000);
        }
    }
};

// Initialize courses module
document.addEventListener('DOMContentLoaded', function() {
    AdminCourses.init();
});

// Make functions globally available
window.openAddCourseModal = AdminCourses.showAddCourseModal.bind(AdminCourses);
window.closeAddCourseModal = AdminCourses.closeModal.bind(AdminCourses);
window.editCourse = AdminCourses.editCourse.bind(AdminCourses);
window.deleteCourse = AdminCourses.deleteCourse.bind(AdminCourses);