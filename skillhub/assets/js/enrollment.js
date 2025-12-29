// ===== ENROLLMENT FORM FUNCTIONALITY =====

// Course data
const COURSES = {
    dropshipping: {
        title: 'Start Dropshipping',
        price: 'PKR 30,000',
        originalPrice: 'PKR 35,000',
        discount: 'Save PKR 5,000',
        duration: '6 Weeks',
        level: 'Beginner',
        instructor: 'Alex Morgan',
        thumbnail: './assets/imgs/thumnail1.png',
        badge: 'Most Popular'
    },
    'digital-art': {
        title: 'Digital Art Pro',
        price: 'PKR 40,000',
        originalPrice: 'PKR 45,000',
        discount: 'Save PKR 5,000',
        duration: '8 Weeks',
        level: 'All Levels',
        instructor: 'Sarah Chen',
        thumbnail: './assets/imgs/thumnail2.png',
        badge: 'Creative'
    },
    podcast: {
        title: 'Podcast in a Week',
        price: 'PKR 8,000',
        originalPrice: 'PKR 10,000',
        discount: 'Save PKR 2,000',
        duration: '1 Week',
        level: 'Beginner',
        instructor: 'Marcus Rivera',
        thumbnail: './assets/imgs/thumnail3.png',
        badge: 'Fast Track'
    },
    ai: {
        title: 'AI Power-Up',
        price: 'PKR 25,000',
        originalPrice: 'PKR 30,000',
        discount: 'Save PKR 5,000',
        duration: '4 Weeks',
        level: 'Intermediate',
        instructor: 'Tech Team',
        thumbnail: './assets/imgs/thumnail4.png',
        badge: 'Trending'
    },
    film: {
        title: 'Phone to Film',
        price: 'PKR 20,000',
        originalPrice: 'PKR 25,000',
        discount: 'Save PKR 5,000',
        duration: '5 Weeks',
        level: 'Beginner',
        instructor: 'Video Experts',
        thumbnail: './assets/imgs/thumnail5.png',
        badge: 'New'
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initEnrollmentPage();
});

function initEnrollmentPage() {
    loadCourseData();
    setupPaymentMethods();
    setupFormValidation();
    setupInputMasks();
}

// Load course data from URL
function loadCourseData() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('course') || 'dropshipping';
    const course = COURSES[courseId] || COURSES.dropshipping;
    
    // Update page elements
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseBadge').textContent = course.badge;
    document.getElementById('courseThumbnail').src = course.thumbnail;
    document.getElementById('courseThumbnail').alt = course.title;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('courseLevel').textContent = course.level;
    document.getElementById('courseInstructor').textContent = course.instructor;
    document.getElementById('coursePrice').textContent = course.price;
    document.getElementById('originalPrice').textContent = course.originalPrice;
    document.getElementById('discountBadge').textContent = course.discount;
}

// Setup payment method selection
function setupPaymentMethods() {
    const options = document.querySelectorAll('.payment-option');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class
            options.forEach(opt => opt.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Check radio
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
            
            // Update fields
            updatePaymentFields(this.dataset.method);
        });
    });
    
    // Set default
    if (options.length > 0) {
        options[0].click();
    }
}

// Update payment fields
function updatePaymentFields(method) {
    const container = document.getElementById('paymentFields');
    if (!container) return;
    
    let html = '';
    
    switch(method) {
        case 'easypaisa':
            html = `
                <div class="form-group">
                    <label for="easypaisaNumber" class="required">EasyPaisa Number</label>
                    <input type="text" id="easypaisaNumber" class="form-control" placeholder="03XX XXXXXXX" required>
                    <span class="error-feedback" id="easypaisaError"></span>
                </div>
                <div class="payment-note">
                    <i class="fas fa-info-circle"></i>
                    You will receive a payment request on your EasyPaisa account
                </div>
            `;
            break;
            
        case 'jazzcash':
            html = `
                <div class="form-group">
                    <label for="jazzcashNumber" class="required">JazzCash Number</label>
                    <input type="text" id="jazzcashNumber" class="form-control" placeholder="03XX XXXXXXX" required>
                    <span class="error-feedback" id="jazzcashError"></span>
                </div>
                <div class="payment-note">
                    <i class="fas fa-info-circle"></i>
                    You will receive a payment request on your JazzCash account
                </div>
            `;
            break;
            
        case 'card':
            html = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="cardNumber" class="required">Card Number</label>
                        <input type="text" id="cardNumber" class="form-control" placeholder="XXXX XXXX XXXX XXXX" required>
                        <span class="error-feedback" id="cardNumberError"></span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="expiryDate" class="required">Expiry Date</label>
                        <input type="text" id="expiryDate" class="form-control" placeholder="MM/YY" required>
                        <span class="error-feedback" id="expiryDateError"></span>
                    </div>
                    <div class="form-group">
                        <label for="cvv" class="required">CVV</label>
                        <input type="text" id="cvv" class="form-control" placeholder="123" required>
                        <span class="error-feedback" id="cvvError"></span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="cardName" class="required">Name on Card</label>
                    <input type="text" id="cardName" class="form-control" placeholder="John Doe" required>
                    <span class="error-feedback" id="cardNameError"></span>
                </div>
            `;
            break;
            
        case 'bank':
            html = `
                <div class="form-group">
                    <label for="accountName" class="required">Account Holder Name</label>
                    <input type="text" id="accountName" class="form-control" placeholder="John Doe" required>
                    <span class="error-feedback" id="accountNameError"></span>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="accountNumber" class="required">Account Number</label>
                        <input type="text" id="accountNumber" class="form-control" placeholder="1234567890" required>
                        <span class="error-feedback" id="accountNumberError"></span>
                    </div>
                    <div class="form-group">
                        <label for="bankName" class="required">Bank Name</label>
                        <input type="text" id="bankName" class="form-control" placeholder="HBL, UBL, MCB" required>
                        <span class="error-feedback" id="bankNameError"></span>
                    </div>
                </div>
                <div class="payment-note">
                    <i class="fas fa-info-circle"></i>
                    Bank details will be provided after form submission
                </div>
            `;
            break;
    }
    
    container.innerHTML = html;
    setupInputMasks(); // Re-apply masks
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('enrollmentForm');
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            processEnrollment();
        }
    });
}

// Validate single field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldId = field.id;
    
    // Clear previous error
    clearFieldError({ target: field });
    
    // Check required
    if (field.required && !value) {
        showError(fieldId, 'This field is required');
        return false;
    }
    
    // Field-specific validation
    switch(fieldId) {
        case 'email':
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                showError(fieldId, 'Please enter a valid email');
                return false;
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
            const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
            if (value && !phoneRegex.test(cleanPhone)) {
                showError(fieldId, 'Please enter a valid phone number');
                return false;
            }
            break;
            
        case 'cnic':
            const cnicRegex = /^\d{5}\-\d{7}\-\d{1}$/;
            if (value && !cnicRegex.test(value)) {
                showError(fieldId, 'Format: XXXXX-XXXXXXX-X');
                return false;
            }
            break;
    }
    
    return true;
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    const fieldId = field.id;
    
    // Remove error class
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('has-error');
    }
    
    // Clear error message
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }
}

// Show error
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Add error class
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.add('has-error');
    }
    
    // Show message
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

// Validate entire form
function validateForm() {
    let isValid = true;
    
    // Required fields
    const required = [
        'firstName', 'lastName', 'email', 'phone', 'cnic',
        'address', 'city', 'country'
    ];
    
    required.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.required && !field.value.trim()) {
            showError(fieldId, 'This field is required');
            isValid = false;
        }
    });
    
    // Terms checkbox
    const terms = document.getElementById('terms');
    if (terms && !terms.checked) {
        showError('terms', 'You must agree to the terms');
        isValid = false;
    }
    
    return isValid;
}

// Process enrollment
function processEnrollment() {
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = getFormData();
    
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage
        saveEnrollment(formData);
        
        // Show success
        showSuccess(formData);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Get form data
function getFormData() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('course') || 'dropshipping';
    const course = COURSES[courseId] || COURSES.dropshipping;
    
    return {
        enrollmentId: 'ENR-' + Date.now(),
        course: {
            id: courseId,
            title: course.title,
            price: course.price,
            date: new Date().toISOString()
        },
        student: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            cnic: document.getElementById('cnic').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
            education: document.getElementById('education')?.value || '',
            occupation: document.getElementById('occupation')?.value || ''
        }
    };
}

// Save enrollment
function saveEnrollment(data) {
    // Get existing enrollments
    const enrollments = JSON.parse(localStorage.getItem('skillhub_enrollments') || '[]');
    
    // Add new enrollment
    enrollments.push(data);
    
    // Save back
    localStorage.setItem('skillhub_enrollments', JSON.stringify(enrollments));
    
    // Update user profile
    updateUserProfile(data.student);
}

// Update user profile
function updateUserProfile(student) {
    const user = {
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        phone: student.phone,
        joined: new Date().toISOString()
    };
    
    localStorage.setItem('skillhub_user', JSON.stringify(user));
}

// Show success modal
function showSuccess(data) {
    const modalHTML = `
        <div class="success-modal-overlay">
            <div class="success-modal">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Enrollment Successful!</h3>
                <div class="success-details">
                    <p><strong>Course:</strong> ${data.course.title}</p>
                    <p><strong>Enrollment ID:</strong> ${data.enrollmentId}</p>
                    <p><strong>Amount:</strong> ${data.course.price}</p>
                </div>
                <div class="success-message">
                    <p><i class="fas fa-envelope"></i> Confirmation sent to ${data.student.email}</p>
                </div>
                <div class="success-actions">
                    <a href="user-profile.html" class="btn btn-primary">My Profile</a>
                    <a href="courses.html" class="btn btn-outline">More Courses</a>
                </div>
            </div>
        </div>
        <style>
            .success-modal-overlay {
                position: fixed;
                top: 0; left: 0;
                width: 100%; height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            
            .success-modal {
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                width: 90%;
            }
            
            .dark-mode .success-modal {
                background: #1f2937;
                color: white;
            }
            
            .success-icon {
                color: #10b981;
                font-size: 4rem;
                margin-bottom: 20px;
            }
            
            .success-modal h3 {
                font-size: 1.8rem;
                margin-bottom: 20px;
            }
            
            .success-details {
                background: #f8fafc;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: left;
            }
            
            .dark-mode .success-details {
                background: #374151;
            }
            
            .success-message {
                margin: 20px 0;
                color: #6b7280;
            }
            
            .success-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            @media (max-width: 768px) {
                .success-modal {
                    padding: 30px 20px;
                }
                
                .success-actions {
                    flex-direction: column;
                }
            }
        </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Auto redirect
    setTimeout(() => {
        window.location.href = 'user-profile.html';
    }, 10000);
}

// Setup input masks
function setupInputMasks() {
    // Phone mask
    const phone = document.getElementById('phone');
    if (phone) {
        phone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 4) {
                    value = value;
                } else if (value.length <= 7) {
                    value = value.slice(0, 4) + ' ' + value.slice(4);
                } else {
                    value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 11);
                }
            }
            e.target.value = value;
        });
    }
    
    // CNIC mask
    const cnic = document.getElementById('cnic');
    if (cnic) {
        cnic.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 5) {
                    value = value;
                } else if (value.length <= 12) {
                    value = value.slice(0, 5) + '-' + value.slice(5);
                } else {
                    value = value.slice(0, 5) + '-' + value.slice(5, 12) + '-' + value.slice(12, 13);
                }
            }
            e.target.value = value;
        });
    }
}