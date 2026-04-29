// Simple carousel for reviews
const reviews = document.querySelectorAll('.review');
if (reviews.length > 0) {
    let currentReview = 0;

    function showReview(idx) {
        reviews.forEach((r, i) => {
            r.classList.toggle('active', i === idx);
        });
    }

    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    
    if (prevBtn) {
        prevBtn.onclick = function() {
            currentReview = (currentReview - 1 + reviews.length) % reviews.length;
            showReview(currentReview);
        };
    }
    if (nextBtn) {
        nextBtn.onclick = function() {
            currentReview = (currentReview + 1) % reviews.length;
            showReview(currentReview);
        };
    }
}

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error messages
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        document.getElementById('successMsg').style.display = 'none';
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const company = document.getElementById('company').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        const terms = document.getElementById('terms').checked;
        
        let isValid = true;
        
        // Validate name
        if (!name) {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        } else if (name.length < 2) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate phone (if provided)
        if (phone && phone.length < 10) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
            isValid = false;
        }
        
        // Validate company
        if (!company) {
            document.getElementById('companyError').textContent = 'Company name is required';
            isValid = false;
        } else if (company.length < 2) {
            document.getElementById('companyError').textContent = 'Company name must be at least 2 characters';
            isValid = false;
        }
        
        // Validate service
        if (!service) {
            document.getElementById('serviceError').textContent = 'Please select a service type';
            isValid = false;
        }
        
        // Validate message
        if (!message) {
            document.getElementById('messageError').textContent = 'Please describe your project details';
            isValid = false;
        } else if (message.length < 10) {
            document.getElementById('messageError').textContent = 'Project details must be at least 10 characters';
            isValid = false;
        }
        
        // Validate terms
        if (!terms) {
            document.getElementById('termsError').textContent = 'You must agree to the terms';
            isValid = false;
        }
        
        // If valid, show success message
        if (isValid) {
            document.getElementById('successMsg').style.display = 'block';
            document.getElementById('successMsg').scrollIntoView({ behavior: 'smooth' });
            contactForm.reset();
            
            // Reset success message after 5 seconds
            setTimeout(() => {
                document.getElementById('successMsg').style.display = 'none';
            }, 5000);
        }
    });
    
    // Real-time validation for email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
            } else {
                document.getElementById('emailError').textContent = '';
            }
        });
    }
    
    // Real-time validation for name
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.length > 0 && this.value.length < 2) {
                document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            } else {
                document.getElementById('nameError').textContent = '';
            }
        });
    }
}