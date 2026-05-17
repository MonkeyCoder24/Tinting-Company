// PrismFade Tinting Company - JavaScript for Luxurious Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (for responsive design)
    const menuToggle = document.createElement('div');
    menuToggle.innerHTML = '&#9776;'; // Hamburger icon
    menuToggle.style.cursor = 'pointer';
    menuToggle.style.fontSize = '1.5rem';
    menuToggle.style.color = '#8a2be2';
    menuToggle.style.display = 'none';
    
    const nav = document.querySelector('nav');
    nav.appendChild(menuToggle);
    
    const navUl = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });

    // Show/hide mobile menu based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            navUl.classList.remove('show');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            const targetSection = document.getElementById('contact');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (typeof emailjs === 'undefined' || !emailjs.send) {
                alert('Email service is unavailable right now. Please refresh the page and try again.');
                return;
            }

            if (typeof emailjs.init === 'function') {
                emailjs.init('gonIFJX4jtRyJIj3l');
            }

            const serviceID = 'service_02fy89r';
            const templateID = 'template_udaff61';
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message
            };

            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    alert('Message sent! Thank you — we will contact you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.error('EmailJS error:', error);
                    alert('Sorry, the email service failed to send your message. Please try again later.');
                });
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add subtle animation to service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    });

    // Tint level controls for image-based car windows
    const tintButtons = document.querySelectorAll('.tint-btn');
    const windowOverlays = document.querySelectorAll('.car-window-overlay');
    const tintStyles = {
        '0.1': 'light',
        '0.4': 'medium',
        '0.7': 'dark'
    };

    tintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tintLevel = this.getAttribute('data-tint');
            const tintClass = tintStyles[tintLevel] || 'medium';

            tintButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            windowOverlays.forEach(overlay => {
                overlay.classList.remove('light', 'medium', 'dark');
                overlay.classList.add(tintClass);
            });
        });
    });

    // Set default tint state on load
    const defaultButton = document.querySelector('.tint-btn[data-tint="0.4"]');
    if (defaultButton) {
        defaultButton.click();
    }
});