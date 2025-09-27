// TCS Website - Premium JavaScript with Enhanced UX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize all features after loading
    setTimeout(() => {
        initSmoothScrolling();
        initScrollAnimations();
        initNavigationEffects();
        initMobileNavigation();
        initContactForm();
        initButtonAnimations();
        initHeroCTA();
        initWhatsAppIntegration();
        initParallaxEffects();
        initPremiumAnimations();
    }, 100);
});

// Loading Screen Management
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                
                // Trigger initial animations
                setTimeout(() => {
                    document.querySelector('.hero-content').classList.add('fade-in');
                    initScrollAnimations();
                }, 300);
            }, 500);
        }
        
        if (loadingProgress) {
            loadingProgress.style.width = progress + '%';
        }
    }, 50);
    
    // Fallback: Hide loading screen after 3 seconds maximum
    setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
        }
    }, 3000);
}

// Enhanced Hero CTA with smooth scrolling and content loading
function initHeroCTA() {
    const heroCTA = document.querySelector('.hero-cta');
    
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state to button
            const originalContent = this.innerHTML;
            this.classList.add('loading');
            this.innerHTML = '<span>Loading...</span>';
            
            // Ensure all content is loaded before scrolling
            setTimeout(() => {
                const contactSection = document.querySelector('#contact');
                
                if (contactSection) {
                    // Make sure contact section is visible and loaded
                    contactSection.style.visibility = 'visible';
                    
                    const navHeight = document.querySelector('.nav').offsetHeight || 80;
                    const targetPosition = contactSection.offsetTop - navHeight - 20;
                    
                    // Smooth scroll with easing
                    smoothScrollTo(targetPosition, 1000);
                    
                    // Highlight contact form briefly
                    setTimeout(() => {
                        const contactForm = document.querySelector('.contact-form');
                        if (contactForm) {
                            contactForm.style.transform = 'scale(1.02)';
                            contactForm.style.boxShadow = '0 12px 32px rgba(255, 107, 53, 0.25)';
                            
                            setTimeout(() => {
                                contactForm.style.transform = 'scale(1)';
                                contactForm.style.boxShadow = '';
                            }, 1000);
                        }
                    }, 800);
                }
                
                // Remove loading state
                this.classList.remove('loading');
                this.innerHTML = originalContent;
            }, 300);
        });
    }
}

// Enhanced smooth scrolling function
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    requestAnimationFrame(animation);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                smoothScrollTo(targetPosition, 800);
                updateActiveNavLink(this);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Enhanced scroll animations with staggered delays
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Add special effects for certain elements
                    if (entry.target.classList.contains('service-card')) {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }
                }, parseInt(delay));
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced navigation effects
function initNavigationEffects() {
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNav() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show navigation on scroll (only on mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        updateActiveSectionInNav();
        ticking = false;
    }
    
    function requestNavUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestNavUpdate);
}

// Update active section based on scroll position
function updateActiveSectionInNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.nav').offsetHeight || 80;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced mobile navigation
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Enhanced contact form with better validation and UX
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Clear previous errors
            clearAllErrors();
            
            // Validate all fields
            let isValid = true;
            
            if (!name) {
                showFieldError('name', 'Name is required');
                isValid = false;
            }
            
            if (!email) {
                showFieldError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message) {
                showFieldError('message', 'Message is required');
                isValid = false;
            }
            
            if (!isValid) {
                showNotification('Please correct the errors below.', 'error');
                return;
            }
            
            // Submit form with loading state
            const submitButton = this.querySelector('.btn');
            const originalContent = submitButton.innerHTML;
            
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Create WhatsApp message
                const whatsappMessage = encodeURIComponent(
                    `Hello! I'm interested in your services.\n\n` +
                    `Name: ${name}\n` +
                    `Email: ${email}\n` +
                    `Phone: ${phone}\n` +
                    `Service: ${service || 'General Inquiry'}\n` +
                    `Message: ${message}`
                );
                
                // Show success message
                showNotification('Thank you! Your message has been sent successfully. Redirecting to WhatsApp...', 'success');
                
                // Reset form
                this.reset();
                
                // Redirect to WhatsApp after 2 seconds
                setTimeout(() => {
                    window.open(`https://wa.me/919867241431?text=${whatsappMessage}`, '_blank');
                }, 2000);
                
                // Reset button
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                submitButton.innerHTML = originalContent;
            }, 1500);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field.id);
    
    switch (field.id) {
        case 'name':
            if (!value) {
                showFieldError(field.id, 'Name is required');
            }
            break;
        case 'email':
            if (!value) {
                showFieldError(field.id, 'Email is required');
            } else if (!isValidEmail(value)) {
                showFieldError(field.id, 'Please enter a valid email address');
            }
            break;
        case 'message':
            if (!value) {
                showFieldError(field.id, 'Message is required');
            }
            break;
    }
}

function clearErrors(e) {
    clearFieldError(e.target.id);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentNode.querySelector('.field-error');
    
    if (!existingError) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #dc3545;
            font-size: 12px;
            margin-top: 4px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.style.opacity = '1';
        }, 10);
    }
    
    field.style.borderColor = '#dc3545';
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '';
}

function clearAllErrors() {
    const errors = document.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    const fields = document.querySelectorAll('.form-control');
    fields.forEach(field => {
        field.style.borderColor = '';
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        min-width: 300px;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-weight: bold;
        font-size: 16px;
        flex-shrink: 0;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.opacity = '0.8';
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// WhatsApp Integration
function initWhatsAppIntegration() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        // Add click tracking
        whatsappFloat.addEventListener('click', function(e) {
            // Show notification
            showNotification('Opening WhatsApp chat...', 'success');
            
            // Add click effect
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add intersection observer to show/hide based on contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        whatsappFloat.style.opacity = '0.5';
                    } else {
                        whatsappFloat.style.opacity = '1';
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(contactSection);
        }
    }
}

// Enhanced button animations
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            if (this.classList.contains('loading')) return;
            
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('loading') && !this.disabled) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const heroPattern = document.querySelector('.hero-pattern');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking && window.innerWidth > 768) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

// Premium animations and interactions
function initPremiumAnimations() {
    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Timeline items stagger animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
    
    // Industry tags animation
    const industryTags = document.querySelectorAll('.industry-tag');
    industryTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 100}ms`;
    });
}

// Performance optimizations
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

// Resize handler
function handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
    
    // Reset nav transform on desktop
    const nav = document.querySelector('.nav');
    if (window.innerWidth > 768 && nav) {
        nav.style.transform = 'translateY(0)';
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .slide-in-up {
        animation: slideInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
        
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            closeNotification(notification);
        });
    }
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .nav-link:focus,
    .btn:focus,
    .form-control:focus {
        outline: 2px solid var(--brand-orange);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// Console log for development
console.log('TCS Website initialized successfully! 🚀');
console.log('Features loaded: Loading screen, smooth scrolling, animations, mobile nav, contact form, WhatsApp integration');

// Export functions for potential external use
window.TCS = {
    showNotification,
    smoothScrollTo,
    updateActiveNavLink
};