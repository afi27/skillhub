// courses.js - Course Management System for SkillHub
document.addEventListener('DOMContentLoaded', function() {
    console.log('Courses JS Loaded');
    
    // Initialize course system
    initCourseSystem();
    loadCourses();
    initFilters();
    initSearch();
    initEnrollment();
    initWishlist();
    initCourseProgress();
});

// ===== COURSE DATA =====
const coursesData = [
    {
        id: 1,
        title: "Start Dropshipping",
        description: "Build a profitable online store without inventory. Learn sourcing, marketing, and scaling strategies.",
        instructor: "Alex Morgan",
        price: 149,
        discountedPrice: 99,
        rating: 4.8,
        students: 1240,
        duration: "6 Weeks",
        level: "Beginner",
        category: "business",
        tags: ["ecommerce", "shopify", "marketing"],
        features: [
            "Find winning products",
            "Build Shopify store",
            "Facebook ads mastery",
            "Order fulfillment",
            "Scaling strategies"
        ],
        color: "#f59e0b",
        icon: "fa-shipping-fast"
    },
    {
        id: 2,
        title: "Digital Art Pro",
        description: "Master Procreate and digital illustration. From basics to professional artwork and commissions.",
        instructor: "Sarah Chen",
        price: 199,
        discountedPrice: 149,
        rating: 4.9,
        students: 2150,
        duration: "8 Weeks",
        level: "All Levels",
        category: "creative",
        tags: ["procreate", "illustration", "design"],
        features: [
            "Procreate fundamentals",
            "Digital painting techniques",
            "Character design",
            "NFT creation",
            "Freelance setup"
        ],
        color: "#8b5cf6",
        icon: "fa-palette"
    },
    {
        id: 3,
        title: "Podcast in a Week",
        description: "Launch your podcast from zero. Equipment, editing, distribution, and monetization strategies.",
        instructor: "Marcus Rivera",
        price: 99,
        discountedPrice: 79,
        rating: 4.7,
        students: 890,
        duration: "1 Week",
        level: "Beginner",
        category: "audio",
        tags: ["audio", "editing", "marketing"],
        features: [
            "Equipment setup",
            "Audio editing (Audacity)",
            "Distribution platforms",
            "Guest booking",
            "Monetization methods"
        ],
        color: "#ef4444",
        icon: "fa-podcast"
    },
    {
        id: 4,
        title: "AI Power-Up",
        description: "Leverage AI tools for business & creativity. ChatGPT, Midjourney, and automation workflows.",
        instructor: "Priya Sharma",
        price: 179,
        discountedPrice: 129,
        rating: 4.8,
        students: 3150,
        duration: "4 Weeks",
        level: "Intermediate",
        category: "tech",
        tags: ["ai", "chatgpt", "automation"],
        features: [
            "ChatGPT mastery",
            "AI image generation",
            "Workflow automation",
            "Business integration",
            "Future trends"
        ],
        color: "#10b981",
        icon: "fa-robot"
    },
    {
        id: 5,
        title: "Phone to Film",
        description: "Create professional videos with your smartphone. Shooting, editing, and storytelling techniques.",
        instructor: "David Lee",
        price: 129,
        discountedPrice: 89,
        rating: 4.6,
        students: 1780,
        duration: "5 Weeks",
        level: "Beginner",
        category: "video",
        tags: ["videography", "editing", "storytelling"],
        features: [
            "Smartphone cinematography",
            "Mobile editing apps",
            "Story structure",
            "Lighting techniques",
            "YouTube optimization"
        ],
        color: "#3b82f6",
        icon: "fa-video"
    },
    {
        id: 6,
        title: "Web Development Bootcamp",
        description: "Learn HTML, CSS, JavaScript and build 5 real projects. From beginner to job-ready developer.",
        instructor: "Michael Rodriguez",
        price: 249,
        discountedPrice: 199,
        rating: 4.9,
        students: 4250,
        duration: "12 Weeks",
        level: "Beginner",
        category: "tech",
        tags: ["web", "javascript", "projects"],
        features: [
            "HTML5 & CSS3",
            "JavaScript ES6+",
            "Responsive design",
            "5 real projects",
            "Portfolio building"
        ],
        color: "#2563eb",
        icon: "fa-code"
    },
    {
        id: 7,
        title: "Social Media Marketing",
        description: "Master Instagram, TikTok, and YouTube growth. Content strategy, algorithms, and monetization.",
        instructor: "Emma Wilson",
        price: 129,
        discountedPrice: 99,
        rating: 4.7,
        students: 2890,
        duration: "4 Weeks",
        level: "Beginner",
        category: "marketing",
        tags: ["social", "content", "growth"],
        features: [
            "Content strategy",
            "Algorithm mastery",
            "Reels/TikTok creation",
            "Analytics tracking",
            "Brand partnerships"
        ],
        color: "#8b5cf6",
        icon: "fa-hashtag"
    },
    {
        id: 8,
        title: "Personal Finance Mastery",
        description: "Take control of your finances. Budgeting, investing, debt management, and wealth building.",
        instructor: "Robert Kim",
        price: 89,
        discountedPrice: 69,
        rating: 4.8,
        students: 1560,
        duration: "3 Weeks",
        level: "All Levels",
        category: "finance",
        tags: ["finance", "investing", "budgeting"],
        features: [
            "Budget creation",
            "Debt elimination",
            "Investment basics",
            "Tax optimization",
            "Retirement planning"
        ],
        color: "#10b981",
        icon: "fa-chart-line"
    }
];

// ===== INITIALIZATION =====
function initCourseSystem() {
    console.log('Initializing course system...');
    
    // Load user's enrolled courses
    loadEnrolledCourses();
    
    // Load wishlist
    loadWishlist();
    
    // Initialize UI components
    initSorting();
    initPagination();
    initCourseModals();
}

// ===== LOAD & DISPLAY COURSES =====
function loadCourses() {
    const coursesContainer = document.getElementById('coursesContainer');
    const featuredCourses = document.getElementById('featuredCourses');
    
    if (coursesContainer) {
        displayCourses(coursesData, coursesContainer);
    }
    
    if (featuredCourses) {
        const featured = coursesData.slice(0, 5);
        displayCourses(featured, featuredCourses);
    }
}

function displayCourses(courses, container) {
    if (!container) return;
    
    container.innerHTML = courses.map(course => `
        <div class="course-card" data-id="${course.id}" data-category="${course.category}" data-level="${course.level}">
            ${course.discountedPrice ? `<div class="course-badge">Sale</div>` : ''}
            
            <div class="course-header">
                <div class="course-icon" style="background: ${course.color};">
                    <i class="fas ${course.icon}"></i>
                </div>
                <div class="course-actions">
                    <button class="btn-icon wishlist-btn" data-id="${course.id}" title="Add to wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="btn-icon share-btn" data-id="${course.id}" title="Share course">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
            
            <div class="course-body">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                
                <div class="course-meta">
                    <span class="meta-item">
                        <i class="fas fa-user"></i> ${course.instructor}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-clock"></i> ${course.duration}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-signal"></i> ${course.level}
                    </span>
                </div>
                
                <div class="course-rating">
                    <div class="stars">
                        ${getStarRating(course.rating)}
                    </div>
                    <span class="rating-text">${course.rating} (${course.students.toLocaleString()})</span>
                </div>
                
                <div class="course-tags">
                    ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="course-footer">
                <div class="course-pricing">
                    ${course.discountedPrice ? `
                        <span class="price-old">$${course.price}</span>
                        <span class="price-new">$${course.discountedPrice}</span>
                    ` : `
                        <span class="price">$${course.price}</span>
                    `}
                </div>
                
                <div class="course-actions">
                    <button class="btn btn-sm btn-outline view-details" data-id="${course.id}">
                        Details
                    </button>
                    <button class="btn btn-sm btn-primary enroll-btn" data-id="${course.id}">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to newly created buttons
    attachCourseEventListeners();
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// ===== FILTERING SYSTEM =====
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categorySelect = document.getElementById('categoryFilter');
    const levelSelect = document.getElementById('levelFilter');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            applyFilter(filter);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Category select
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            applyFilter(this.value);
        });
    }
    
    // Level select
    if (levelSelect) {
        levelSelect.addEventListener('change', function() {
            applyFilter(null, this.value);
        });
    }
    
    // Price range
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = `$${this.value}`;
            applyFilter(null, null, this.value);
        });
    }
    
    // Clear filters button
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            clearAllFilters();
        });
    }
}

function applyFilter(category = null, level = null, maxPrice = null) {
    let filteredCourses = [...coursesData];
    
    // Apply category filter
    if (category && category !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.category === category);
    }
    
    // Apply level filter
    if (level && level !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.level.toLowerCase() === level.toLowerCase());
    }
    
    // Apply price filter
    if (maxPrice) {
        filteredCourses = filteredCourses.filter(course => {
            const price = course.discountedPrice || course.price;
            return price <= parseInt(maxPrice);
        });
    }
    
    // Update display
    const coursesContainer = document.getElementById('coursesContainer');
    if (coursesContainer) {
        displayCourses(filteredCourses, coursesContainer);
        updateResultsCount(filteredCourses.length);
    }
}

function clearAllFilters() {
    // Reset UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === 'all') {
            btn.classList.add('active');
        }
    });
    
    const categorySelect = document.getElementById('categoryFilter');
    const levelSelect = document.getElementById('levelFilter');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (categorySelect) categorySelect.value = 'all';
    if (levelSelect) levelSelect.value = 'all';
    if (priceRange && priceValue) {
        priceRange.value = 250;
        priceValue.textContent = '$250';
    }
    
    // Show all courses
    const coursesContainer = document.getElementById('coursesContainer');
    if (coursesContainer) {
        displayCourses(coursesData, coursesContainer);
        updateResultsCount(coursesData.length);
    }
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `${count} course${count !== 1 ? 's' : ''} found`;
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchInput = document.getElementById('courseSearch');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput) {
        // Search on input with debounce
        let timeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
        
        // Search on button click
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                performSearch(searchInput.value);
            });
        }
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    if (!query.trim()) {
        // If search is empty, show all courses
        const coursesContainer = document.getElementById('coursesContainer');
        if (coursesContainer) {
            displayCourses(coursesData, coursesContainer);
            updateResultsCount(coursesData.length);
        }
        return;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    const results = coursesData.filter(course => {
        // Search in title, description, instructor, and tags
        return (
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.instructor.toLowerCase().includes(searchTerm) ||
            course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    });
    
    // Update display
    const coursesContainer = document.getElementById('coursesContainer');
    if (coursesContainer) {
        displayCourses(results, coursesContainer);
        updateResultsCount(results.length);
        
        // Highlight search terms
        highlightSearchTerms(searchTerm);
    }
}

function highlightSearchTerms(term) {
    const courseTitles = document.querySelectorAll('.course-title');
    const courseDescriptions = document.querySelectorAll('.course-description');
    
    const regex = new RegExp(`(${term})`, 'gi');
    
    courseTitles.forEach(title => {
        title.innerHTML = title.textContent.replace(regex, '<mark>$1</mark>');
    });
    
    courseDescriptions.forEach(desc => {
        desc.innerHTML = desc.textContent.replace(regex, '<mark>$1</mark>');
    });
}

// ===== ENROLLMENT SYSTEM =====
function initEnrollment() {
    // Load previously enrolled courses
    loadEnrolledCourses();
}

function enrollInCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    // Get enrolled courses from localStorage
    let enrolledCourses = JSON.parse(localStorage.getItem('skillhub_enrolled_courses')) || [];
    
    // Check if already enrolled
    if (enrolledCourses.some(c => c.id === courseId)) {
        showNotification(`You're already enrolled in "${course.title}"`, 'info');
        return;
    }
    
    // Add to enrolled courses
    enrolledCourses.push({
        id: course.id,
        title: course.title,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        lastAccessed: new Date().toISOString()
    });
    
    // Save to localStorage
    localStorage.setItem('skillhub_enrolled_courses', JSON.stringify(enrolledCourses));
    
    // Show success message
    showNotification(`Successfully enrolled in "${course.title}"!`, 'success');
    
    // Update UI
    updateEnrollmentButton(courseId, true);
    
    // If on dashboard, refresh dashboard stats
    if (typeof updateDashboardStats === 'function') {
        updateDashboardStats();
    }
}

function loadEnrolledCourses() {
    const enrolledCourses = JSON.parse(localStorage.getItem('skillhub_enrolled_courses')) || [];
    return enrolledCourses;
}

function updateEnrollmentButton(courseId, isEnrolled) {
    const buttons = document.querySelectorAll(`.enroll-btn[data-id="${courseId}"]`);
    
    buttons.forEach(button => {
        if (isEnrolled) {
            button.textContent = 'Enrolled';
            button.classList.remove('btn-primary');
            button.classList.add('btn-secondary');
            button.disabled = true;
        } else {
            button.textContent = 'Enroll Now';
            button.classList.remove('btn-secondary');
            button.classList.add('btn-primary');
            button.disabled = false;
        }
    });
}

// ===== WISHLIST SYSTEM =====
function initWishlist() {
    // Load wishlist on page load
    loadWishlist();
}

function toggleWishlist(courseId) {
    let wishlist = JSON.parse(localStorage.getItem('skillhub_wishlist')) || [];
    const course = coursesData.find(c => c.id === courseId);
    
    // Check if already in wishlist
    const index = wishlist.findIndex(item => item.id === courseId);
    
    if (index === -1) {
        // Add to wishlist
        wishlist.push({
            id: course.id,
            title: course.title,
            price: course.discountedPrice || course.price,
            addedAt: new Date().toISOString()
        });
        
        showNotification(`Added "${course.title}" to wishlist`, 'success');
        updateWishlistButton(courseId, true);
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showNotification(`Removed "${course.title}" from wishlist`, 'info');
        updateWishlistButton(courseId, false);
    }
    
    // Save to localStorage
    localStorage.setItem('skillhub_wishlist', JSON.stringify(wishlist));
    
    // Update wishlist count
    updateWishlistCount();
}

function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('skillhub_wishlist')) || [];
    
    // Update wishlist buttons
    wishlist.forEach(item => {
        updateWishlistButton(item.id, true);
    });
    
    // Update count
    updateWishlistCount();
    
    return wishlist;
}

function updateWishlistButton(courseId, isInWishlist) {
    const buttons = document.querySelectorAll(`.wishlist-btn[data-id="${courseId}"]`);
    
    buttons.forEach(button => {
        const icon = button.querySelector('i');
        if (icon) {
            icon.className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
            icon.style.color = isInWishlist ? '#ef4444' : '';
        }
        button.title = isInWishlist ? 'Remove from wishlist' : 'Add to wishlist';
    });
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('skillhub_wishlist')) || [];
    const countElement = document.getElementById('wishlistCount');
    
    if (countElement) {
        countElement.textContent = wishlist.length;
        countElement.style.display = wishlist.length > 0 ? 'inline' : 'none';
    }
}

// ===== COURSE PROGRESS =====
function initCourseProgress() {
    // This would track course progress
    // For now, just initialize
}

// ===== SORTING =====
function initSorting() {
    const sortSelect = document.getElementById('sortSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortCourses(this.value);
        });
    }
}

function sortCourses(sortBy) {
    let sortedCourses = [...coursesData];
    
    switch(sortBy) {
        case 'price-low':
            sortedCourses.sort((a, b) => {
                const priceA = a.discountedPrice || a.price;
                const priceB = b.discountedPrice || b.price;
                return priceA - priceB;
            });
            break;
            
        case 'price-high':
            sortedCourses.sort((a, b) => {
                const priceA = a.discountedPrice || a.price;
                const priceB = b.discountedPrice || b.price;
                return priceB - priceA;
            });
            break;
            
        case 'rating':
            sortedCourses.sort((a, b) => b.rating - a.rating);
            break;
            
        case 'popular':
            sortedCourses.sort((a, b) => b.students - a.students);
            break;
            
        case 'newest':
            // Assuming newer courses have higher IDs
            sortedCourses.sort((a, b) => b.id - a.id);
            break;
            
        default:
            // Default: alphabetical
            sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    // Update display
    const coursesContainer = document.getElementById('coursesContainer');
    if (coursesContainer) {
        displayCourses(sortedCourses, coursesContainer);
    }
}

// ===== COURSE DETAIL MODALS =====
function initCourseModals() {
    // View details button handler
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-details')) {
            const courseId = parseInt(e.target.closest('.view-details').dataset.id);
            showCourseDetails(courseId);
        }
        
        // Share button
        if (e.target.closest('.share-btn')) {
            const courseId = parseInt(e.target.closest('.share-btn').dataset.id);
            shareCourse(courseId);
        }
    });
}

function showCourseDetails(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    // Create modal HTML
    const modalHTML = `
        <div class="course-modal">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                
                <div class="course-modal-header" style="background: ${course.color}20;">
                    <div class="course-modal-icon" style="background: ${course.color};">
                        <i class="fas ${course.icon}"></i>
                    </div>
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                </div>
                
                <div class="course-modal-body">
                    <div class="modal-section">
                        <h3>Course Details</h3>
                        <div class="details-grid">
                            <div class="detail-item">
                                <i class="fas fa-user"></i>
                                <span><strong>Instructor:</strong> ${course.instructor}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span><strong>Duration:</strong> ${course.duration}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-signal"></i>
                                <span><strong>Level:</strong> ${course.level}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-users"></i>
                                <span><strong>Students:</strong> ${course.students.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3>What You'll Learn</h3>
                        <ul class="features-list">
                            ${course.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Course Includes</h3>
                        <div class="includes-grid">
                            <div class="include-item">
                                <i class="fas fa-video"></i>
                                <span>${course.duration.includes('Week') ? 'Weekly' : 'Daily'} video lessons</span>
                            </div>
                            <div class="include-item">
                                <i class="fas fa-file-alt"></i>
                                <span>Downloadable resources</span>
                            </div>
                            <div class="include-item">
                                <i class="fas fa-certificate"></i>
                                <span>Certificate of completion</span>
                            </div>
                            <div class="include-item">
                                <i class="fas fa-comments"></i>
                                <span>Community access</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-modal-footer">
                    <div class="modal-pricing">
                        ${course.discountedPrice ? `
                            <span class="price-old">$${course.price}</span>
                            <span class="price-new">$${course.discountedPrice}</span>
                        ` : `
                            <span class="price">$${course.price}</span>
                        `}
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-outline" id="addToWishlistModal" data-id="${course.id}">
                            <i class="far fa-heart"></i> Wishlist
                        </button>
                        <button class="btn btn-primary" id="enrollModal" data-id="${course.id}">
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .course-modal {
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
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            color: #6b7280;
            cursor: pointer;
            z-index: 1;
        }
        
        .course-modal-header {
            padding: 3rem 2rem 2rem;
            border-radius: 20px 20px 0 0;
            text-align: center;
            position: relative;
        }
        
        .course-modal-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: white;
            font-size: 2rem;
        }
        
        .course-modal-body {
            padding: 2rem;
        }
        
        .modal-section {
            margin-bottom: 2rem;
        }
        
        .modal-section h3 {
            margin-bottom: 1rem;
            color: #1e40af;
        }
        
        .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .detail-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: #4b5563;
        }
        
        .detail-item i {
            color: #2563eb;
        }
        
        .features-list {
            list-style: none;
            padding: 0;
        }
        
        .features-list li {
            margin-bottom: 0.5rem;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }
        
        .features-list i {
            color: #10b981;
            margin-top: 0.25rem;
        }
        
        .includes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.5rem;
        }
        
        .include-item {
            text-align: center;
            padding: 1rem;
            background: #f9fafb;
            border-radius: 10px;
        }
        
        .include-item i {
            font-size: 1.5rem;
            color: #2563eb;
            margin-bottom: 0.5rem;
        }
        
        .course-modal-footer {
            padding: 1.5rem 2rem;
            border-top: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f9fafb;
            border-radius: 0 0 20px 20px;
        }
        
        .modal-pricing {
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .price-old {
            text-decoration: line-through;
            color: #6b7280;
            margin-right: 0.5rem;
        }
        
        .price-new {
            color: #10b981;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
            }
            
            .course-modal-footer {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
            
            .modal-actions {
                width: 100%;
            }
            
            .modal-actions .btn {
                flex: 1;
            }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Add event listeners
    const modal = modalContainer.querySelector('.course-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const wishlistBtn = modal.querySelector('#addToWishlistModal');
    const enrollBtn = modal.querySelector('#enrollModal');
    
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modalContainer.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            toggleWishlist(courseId);
            closeBtn.click();
        });
    }
    
    if (enrollBtn) {
        enrollBtn.addEventListener('click', () => {
            enrollInCourse(courseId);
            closeBtn.click();
        });
    }
    
    // Check if already enrolled
    const enrolledCourses = loadEnrolledCourses();
    if (enrolledCourses.some(c => c.id === courseId)) {
        enrollBtn.textContent = 'Already Enrolled';
        enrollBtn.disabled = true;
        enrollBtn.classList.remove('btn-primary');
        enrollBtn.classList.add('btn-secondary');
    }
    
    // Check wishlist status
    const wishlist = JSON.parse(localStorage.getItem('skillhub_wishlist')) || [];
    if (wishlist.some(item => item.id === courseId)) {
        const icon = wishlistBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-heart';
            icon.style.color = '#ef4444';
        }
        wishlistBtn.querySelector('span').textContent = 'In Wishlist';
    }
}

function shareCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    const shareUrl = `${window.location.origin}/course/${courseId}`;
    const shareText = `Check out "${course.title}" on SkillHub!`;
    
    if (navigator.share) {
        // Use Web Share API if available
        navigator.share({
            title: course.title,
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
            .then(() => {
                showNotification('Link copied to clipboard!', 'success');
            })
            .catch(() => {
                prompt('Copy this link:', shareUrl);
            });
    }
}

// ===== PAGINATION =====
function initPagination() {
    const itemsPerPage = 6;
    let currentPage = 1;
    
    function updatePagination() {
        const totalPages = Math.ceil(coursesData.length / itemsPerPage);
        const paginationContainer = document.getElementById('pagination');
        
        if (!paginationContainer || totalPages <= 1) return;
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
                    data-page="${currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                paginationHTML += `
                    <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                            data-page="${i}">
                        ${i}
                    </button>
                `;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                paginationHTML += `<span class="pagination-dots">...</span>`;
            }
        }
        
        // Next button
        paginationHTML += `
            <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                    data-page="${currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        paginationContainer.innerHTML = paginationHTML;
        
        // Add event listeners
        paginationContainer.querySelectorAll('.pagination-btn:not(.disabled)').forEach(btn => {
            btn.addEventListener('click', function() {
                const page = parseInt(this.dataset.page);
                if (page && page !== currentPage) {
                    currentPage = page;
                    showPage(currentPage);
                    updatePagination();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
    
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageCourses = coursesData.slice(start, end);
        
        const coursesContainer = document.getElementById('coursesContainer');
        if (coursesContainer) {
            displayCourses(pageCourses, coursesContainer);
        }
    }
    
    // Initial setup
    updatePagination();
    showPage(1);
}

// ===== ATTACH EVENT LISTENERS =====
function attachCourseEventListeners() {
    // Enroll buttons
    document.querySelectorAll('.enroll-btn').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.id);
            enrollInCourse(courseId);
        });
    });
    
    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.id);
            toggleWishlist(courseId);
        });
    });
    
    // Share buttons
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.id);
            shareCourse(courseId);
        });
    });
}

// ===== HELPER FUNCTIONS =====
function showNotification(message, type = 'info') {
    if (typeof SkillHubCore !== 'undefined' && SkillHubCore.showNotification) {
        SkillHubCore.showNotification(message, type);
    } else {
        alert(message); // Fallback
    }
}

// Initialize when page loads
window.SkillHubCourses = {
    enrollInCourse,
    toggleWishlist,
    shareCourse,
    loadCourses,
    applyFilter,
    clearAllFilters
};
