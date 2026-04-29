// ========================================
// GREYWOOD MEDIA - Advanced Interactive Features
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // ========================================
    // TESTIMONIAL SLIDER
    // ========================================
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    let currentSlide = 0;
    let slidesPerView = 3;
    
    // Create dots
    if (testimonialCards.length > 0 && dotsContainer) {
        const numDots = Math.ceil(testimonialCards.length / slidesPerView);
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }
    
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('span');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        const cardWidth = testimonialCards[0].offsetWidth + 24; // Including gap
        const offset = -currentSlide * cardWidth * slidesPerView;
        
        if (testimonialTrack) {
            testimonialTrack.style.transform = `translateX(${offset}px)`;
        }
        updateDots();
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = Math.max(0, currentSlide - 1);
            goToSlide(currentSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const maxSlide = Math.ceil(testimonialCards.length / slidesPerView) - 1;
            currentSlide = Math.min(maxSlide, currentSlide + 1);
            goToSlide(currentSlide);
        });
    }
    
    // Auto-advance testimonials
    setInterval(() => {
        const maxSlide = Math.ceil(testimonialCards.length / slidesPerView) - 1;
        currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
        goToSlide(currentSlide);
    }, 5000);
    
    // ========================================
    // PORTFOLIO FILTER
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('p').style.maxHeight = '0';
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('p');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // ========================================
    // ANIMATE ON SCROLL
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.service-card, .process-step, .portfolio-item, .pricing-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // HERO ANIMATION ON LOAD
    // ========================================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // ========================================
    // FORM VALIDATION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
            
            const successMsg = document.getElementById('successMsg');
            if (successMsg) {
                successMsg.classList.remove('show');
            }
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const company = document.getElementById('company').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            const terms = document.getElementById('terms') ? document.getElementById('terms').checked : true;
            
            let isValid = true;
            
            // Validate name
            if (!name) {
                const nameError = document.getElementById('nameError');
                if (nameError) nameError.textContent = 'Name is required';
                isValid = false;
            } else if (name.length < 2) {
                const nameError = document.getElementById('nameError');
                if (nameError) nameError.textContent = 'Name must be at least 2 characters';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                const emailError = document.getElementById('emailError');
                if (emailError) emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                const emailError = document.getElementById('emailError');
                if (emailError) emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Validate phone (if provided)
            if (phone && phone.length < 10) {
                const phoneError = document.getElementById('phoneError');
                if (phoneError) phoneError.textContent = 'Please enter a valid phone number';
                isValid = false;
            }
            
            // Validate company
            if (!company) {
                const companyError = document.getElementById('companyError');
                if (companyError) companyError.textContent = 'Company name is required';
                isValid = false;
            } else if (company.length < 2) {
                const companyError = document.getElementById('companyError');
                if (companyError) companyError.textContent = 'Company name must be at least 2 characters';
                isValid = false;
            }
            
            // Validate service
            if (!service) {
                const serviceError = document.getElementById('serviceError');
                if (serviceError) serviceError.textContent = 'Please select a service type';
                isValid = false;
            }
            
            // Validate message
            if (!message) {
                const messageError = document.getElementById('messageError');
                if (messageError) messageError.textContent = 'Please describe your project details';
                isValid = false;
            } else if (message.length < 10) {
                const messageError = document.getElementById('messageError');
                if (messageError) messageError.textContent = 'Project details must be at least 10 characters';
                isValid = false;
            }
            
            // If valid, show success message
            if (isValid) {
                if (successMsg) {
                    successMsg.classList.add('show');
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                contactForm.reset();
                
                // Reset success message after 5 seconds
                setTimeout(() => {
                    if (successMsg) {
                        successMsg.classList.remove('show');
                    }
                }, 5000);
            }
        });
        
        // Real-time validation for email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailError = document.getElementById('emailError');
                if (this.value && !emailRegex.test(this.value)) {
                    if (emailError) emailError.textContent = 'Please enter a valid email address';
                } else if (emailError) {
                    emailError.textContent = '';
                }
            });
        }
        
        // Real-time validation for name
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                const nameError = document.getElementById('nameError');
                if (this.value.length > 0 && this.value.length < 2) {
                    if (nameError) nameError.textContent = 'Name must be at least 2 characters';
                } else if (nameError) {
                    nameError.textContent = '';
                }
            });
        }
    }
    
    // ========================================
    // NEWSLETTER FORM
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.value) {
                alert('Thank you for subscribing! You will receive our latest updates.');
                input.value = '';
            }
        });
    }
    
    // ========================================
    // COUNTER ANIMATION FOR STATS
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const num = parseInt(text.replace(/\D/g, ''));
                
                if (num) {
                    let current = 0;
                    const increment = num / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            current = num;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current) + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '') + (text.includes('h') ? 'h' : '');
                    }, 30);
                }
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    console.log('Greywood Media - Interactive Features Loaded');
});