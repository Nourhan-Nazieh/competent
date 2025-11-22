
// <!-- ==================== START Loader JavaScript ==================== -->

(function() {
    'use strict';
    
    const pageLoader = document.getElementById('pageLoader');
    const progressBar = document.getElementById('progressBar');
    
    let progress = 0;
    const duration = 1500; // 2.5 seconds
    const interval = 50; // Update every 50ms
    const increment = (100 / (duration / interval));
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Hide loader after completion
            setTimeout(() => {
                pageLoader.classList.add('loaded');
                
                // Allow scrolling again
                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                }, 600);
            }, 300);
        }
        
        // Update progress bar and percentage
        progressBar.style.width = progress + '%';
        
    }, interval);
    
    // Ensure loader is hidden on page load (fallback)
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!pageLoader.classList.contains('loaded')) {
                progress = 100;
                progressBar.style.width = '100%';
                
                setTimeout(() => {
                    pageLoader.classList.add('loaded');
                    document.body.style.overflow = 'auto';
                }, 500);
            }
        }, 3000); // Max 3 seconds
    });
    
    })();
    
// ==================== Animated Counters ====================
function animateCounters() {
    const counters = document.querySelectorAll(' [data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || counter.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize counters on page load
document.addEventListener('DOMContentLoaded', animateCounters);


// ==================== Smooth Scroll for Anchor Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// ==================== Parallax Effect ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    if (heroOverlay) {
        heroOverlay.style.opacity = Math.min(0.7 + (scrolled / 1000), 0.9);
    }
});



(function() {
    'use strict';
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initAOS();
        initHeader();
        initMobileMenu();
        initDropdowns();
        initLanguageSwitcher();
        initSmoothScroll();
        initBackToTop();
        initVideo();
        initActiveLinks();
    });
    
    // Initialize AOS animations
    function initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
    
    // Header scroll effect
    function initHeader() {
        const header = document.getElementById('mainHeader');
        
        function handleScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }
    
    // Mobile menu toggle
    function initMobileMenu() {
        const toggle = document.getElementById('mobileToggle');
        const nav = document.getElementById('mainNav');
        const body = document.body;
        
        if (!toggle || !nav) return;
        
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            
            if (nav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !toggle.contains(e.target)) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
                
                // Close all dropdowns
                document.querySelectorAll('.menu-item.has-dropdown').forEach(function(item) {
                    item.classList.remove('open');
                });
                
                // Close language switcher
                document.getElementById('languageSwitcher').classList.remove('open');
            }
        });
    }
    
    // Dropdown menus
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.menu-item.has-dropdown');
        
        dropdowns.forEach(function(dropdown) {
            const link = dropdown.querySelector('.menu-link');
            
            link.addEventListener('click', function(e) {
                // Only handle on mobile
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(function(other) {
                        if (other !== dropdown) {
                            other.classList.remove('open');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('open');
                }
            });
        });
    }
    
    // Language switcher
    function initLanguageSwitcher() {
        const switcher = document.getElementById('languageSwitcher');
        const btn = document.getElementById('languageBtn');
        const options = document.querySelectorAll('.language-option');
        
        if (!switcher || !btn) return;
        
        // Toggle dropdown on mobile
        btn.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.stopPropagation();
                switcher.classList.toggle('open');
            }
        });
        
        // Handle language selection
        options.forEach(function(option) {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const langText = lang === 'en' ? 'EN' : 'AR';
                
                // Update button text
                btn.querySelector('span').textContent = langText;
                
                // Update active state
                options.forEach(function(opt) {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close dropdown on mobile
                if (window.innerWidth <= 992) {
                    switcher.classList.remove('open');
                }
                
                console.log('Language changed to:', lang);
            });
        });
    }
    
    // Smooth scroll
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#login' || href === '#signup') {
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const header = document.getElementById('mainHeader');
                    const headerHeight = header ? header.offsetHeight : 70;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    const nav = document.getElementById('mainNav');
                    const toggle = document.getElementById('mobileToggle');
                    
                    if (nav && nav.classList.contains('active')) {
                        toggle.classList.remove('active');
                        nav.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    }
    
 
    // Active link highlighting
    function initActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('.menu-link');
        
        if (sections.length === 0) return;
        
        function updateActiveLink() {
            const scrollPos = window.scrollY + 150;
            
            sections.forEach(function(section) {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                
                if (scrollPos >= top && scrollPos < top + height) {
                    links.forEach(function(link) {
                        const href = link.getAttribute('href');
                        
                        if (href === '#' + id) {
                            link.classList.add('active');
                        } else if (href && href.startsWith('#')) {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveLink);
    }
    
})();

// <!-- ==================== START Hero JavaScript ==================== -->

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Parallax effect on hero image
gsap.to('.hero-visual', {
    yPercent: 10,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Parallax on particles
gsap.to('.particle:nth-child(1)', {
    y: 100,
    x: -50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

gsap.to('.particle:nth-child(2)', {
    y: -80,
    x: 60,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

gsap.to('.particle:nth-child(3)', {
    y: 120,
    x: 40,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

gsap.to('.particle:nth-child(4)', {
    y: -100,
    x: -70,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Magnetic button effect
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// <!-- ==================== START Stats Section Uder hero ==================== -->

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Intersection Observer for triggering animation when in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

// Observe the stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}


// ================= Services Section JavaScript =================

(function() {
    'use strict';
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initAOS();
        initTabs();
        initKeyboardNav();
    });
    
    // Initialize AOS animations
    function initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
    
    // Tabs functionality
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all buttons
                tabBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all panels
                tabPanels.forEach(function(panel) {
                    panel.classList.remove('active');
                });
                
                // Show target panel
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    
                    // Refresh AOS animations
                    AOS.refresh();
                }
            });
        });
    }
    
    // Keyboard navigation
    function initKeyboardNav() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        let currentIndex = 0;
        
        document.addEventListener('keydown', function(e) {
            // Only work if focus is on a tab button
            if (!document.activeElement.classList.contains('tab-btn')) {
                return;
            }
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                currentIndex = (currentIndex + 1) % tabBtns.length;
                tabBtns[currentIndex].click();
                tabBtns[currentIndex].focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                currentIndex = (currentIndex - 1 + tabBtns.length) % tabBtns.length;
                tabBtns[currentIndex].click();
                tabBtns[currentIndex].focus();
            }
        });
        
        // Update current index when clicking tabs
        tabBtns.forEach(function(btn, index) {
            btn.addEventListener('click', function() {
                currentIndex = index;
            });
        });
    }
    
})();
   
//==================Clints Section================

(function() {
    'use strict';
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initAOS();
        initLogosSlider();
    });
    
    // Initialize AOS animations
    function initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
    
    // Logos slider functionality
    function initLogosSlider() {
        const track = document.querySelector('.logos-track');
        
        if (!track) return;
        
        // Pause animation on hover
        track.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Optional: Adjust speed based on screen size
        function adjustSpeed() {
            if (window.innerWidth <= 576) {
                track.style.animationDuration = '70s';
            } else if (window.innerWidth <= 992) {
                track.style.animationDuration = '55s';
            } else {
                track.style.animationDuration = '70s';
            }
        }
        
        adjustSpeed();
        window.addEventListener('resize', adjustSpeed);
    }
    
})();
// <!-- ================= START Recruitment Section ================= -->

(function() {
    'use strict';
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initAOS();
        initCards();
    });
    
    // Initialize AOS animations
    function initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
    
    // Cards interactions
    function initCards() {
        const cards = document.querySelectorAll('.recruit-card');
        
        cards.forEach(function(card) {
            // Add click effect
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.card-btn')) {
                    const btn = this.querySelector('.card-btn');
                    if (btn) {
                        btn.click();
                    }
                }
            });
            
            // Animate features on hover
            card.addEventListener('mouseenter', function() {
                const features = this.querySelectorAll('.card-features li');
                features.forEach(function(feature, index) {
                    setTimeout(function() {
                        feature.style.transform = 'translateX(4px)';
                        feature.style.transition = 'transform 0.3s ease';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                const features = this.querySelectorAll('.card-features li');
                features.forEach(function(feature) {
                    feature.style.transform = 'translateX(0)';
                });
            });
        });
    }
    
})();
// <!-- ================= START Contact Section ================= -->

(function() {
    'use strict';
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initAOS();
        initLottie();
        initContactForm();
        initFormValidation();
    });
    
    // Initialize AOS animations
    function initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize Lottie animation
    function initLottie() {
const lottieContainer = document.getElementById('lottieAnimation');

if (!lottieContainer) return;

// Create dotlottie element
const player = document.createElement('dotlottie-wc');
player.setAttribute(
'src',
'https://lottie.host/2daf08e3-3ada-4d3b-b4f0-18dbb19e40d5/tQ310BAQPK.lottie'
);
player.setAttribute('autoplay', '');
player.setAttribute('loop', '');
player.style.width = "100%";
player.style.height = "100%";

lottieContainer.appendChild(player);
}

    // Contact form handling
    function initContactForm() {
        const form = document.getElementById('contactForm');
        
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate all fields
            if (!validateForm(data)) {
                return;
            }
            
            // Here you would send the data to your backend
            console.log('Form submitted:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
        });
    }
    
    // Form validation
    function validateForm(data) {
        // Check required fields
        if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
            alert('Please fill in all required fields');
            return false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    // Show success message
    function showSuccessMessage() {
        alert('Thank you for your message! We will get back to you within 24 hours.');
    }
    
    // Form field validation and styling
    function initFormValidation() {
        const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        inputs.forEach(function(input) {
            // Focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                // Mark as filled if has value
                if (this.value.trim() !== '') {
                    this.classList.add('filled');
                } else {
                    this.classList.remove('filled');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.style.borderColor = '';
                }
            });
            
            // Validation on blur
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ff6b6b';
                }
            });
        });
    }
    
})();
// <!-- ================= START Footer ================= -->

// ================= Footer JavaScript =================

(function() {
    'use strict';
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initBackToTop();
        initSmoothScroll();
    });
    
   
    // Smooth scroll for anchor links
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
})();

// <!-- ==================== START Chatbot ==================== -->

(function() {
    'use strict';
    
    // Elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotBadge = document.querySelector('.chatbot-badge');
    
    // State
    let isOpen = false;
    let hasSeenWelcome = false;
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initChatbot();
    });
    
    // Initialize chatbot
    function initChatbot() {
        // Show welcome message after delay
        setTimeout(function() {
            if (!hasSeenWelcome && !isOpen) {
                addBotMessage('Hi! 👋 How can I help you today?', true);
                hasSeenWelcome = true;
            }
        }, 2000);
        
        // Event listeners
        chatbotToggle.addEventListener('click', toggleChatbot);
        chatbotClose.addEventListener('click', closeChatbot);
        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Toggle chatbot
    function toggleChatbot() {
        isOpen = !isOpen;
        chatbotWindow.classList.toggle('active');
        chatbotToggle.classList.toggle('active');
        
        if (isOpen) {
            chatbotInput.focus();
            chatbotBadge.style.display = 'none';
            
            // Show welcome message if first time
            if (chatbotMessages.children.length === 0) {
                addBotMessage('Hello! Welcome to Competent HR Solutions. 👋', false);
                setTimeout(function() {
                    addBotMessage('How can I assist you today?', false);
                    setTimeout(function() {
                        showQuickReplies();
                    }, 800);
                }, 1000);
            }
        }
    }
    
    // Close chatbot
    function closeChatbot() {
        isOpen = false;
        chatbotWindow.classList.remove('active');
        chatbotToggle.classList.remove('active');
    }
    
    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        addUserMessage(message);
        
        // Clear input
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Get bot response
        setTimeout(function() {
            hideTypingIndicator();
            const response = getBotResponse(message);
            addBotMessage(response, false);
        }, 1500);
    }
    
    // Add user message
    function addUserMessage(text) {
        const time = getCurrentTime();
        const messageHTML = `
            <div class="message user">
                <div class="message-content">
                    <div class="message-bubble">${escapeHtml(text)}</div>
                    <div class="message-time">${time}</div>
                </div>
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        `;
        
        chatbotMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }
    
    // Add bot message
    function addBotMessage(text, showBadge) {
        const time = getCurrentTime();
        const messageHTML = `
            <div class="message bot">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">${text}</div>
                    <div class="message-time">${time}</div>
                </div>
            </div>
        `;
        
        chatbotMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
        
        if (showBadge && !isOpen) {
            chatbotBadge.style.display = 'flex';
        }
    }
    
    // Show quick replies
    function showQuickReplies() {
        const quickRepliesHTML = `
            <div class="message bot">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">Choose a topic:</div>
                    <div class="quick-replies">
                        <button class="quick-reply" data-reply="services">
                            <i class="fas fa-briefcase"></i> Our Services
                        </button>
                        <button class="quick-reply" data-reply="consultancy">
                            <i class="fas fa-lightbulb"></i> HR Consultancy
                        </button>
                        <button class="quick-reply" data-reply="training">
                            <i class="fas fa-graduation-cap"></i> Training
                        </button>
                        <button class="quick-reply" data-reply="recruitment">
                            <i class="fas fa-user-tie"></i> Recruitment
                        </button>
                        <button class="quick-reply" data-reply="contact">
                            <i class="fas fa-phone"></i> Contact Us
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        chatbotMessages.insertAdjacentHTML('beforeend', quickRepliesHTML);
        scrollToBottom();
        
        // Add event listeners to quick reply buttons
        const quickReplyButtons = chatbotMessages.querySelectorAll('.quick-reply');
        quickReplyButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const reply = this.getAttribute('data-reply');
                handleQuickReply(reply);
            });
        });
    }
    
    // Handle quick reply
    function handleQuickReply(reply) {
        const responses = {
            services: 'We offer HR Consultancy, HR Management, Training & Development, and Recruitment Services. Which one interests you?',
            consultancy: 'Our HR Consultancy services include strategic planning, policy development, and organizational design. Would you like to know more?',
            training: 'We provide customized training programs in leadership, communication, and professional development. Contact us for details!',
            recruitment: 'Our recruitment services include end-to-end hiring, executive search, and mass recruitment. How can we help you?',
            contact: 'You can reach us at hr@competentrec.com or WhatsApp: 01068046764. We\'re located in 6 October, Cairo, Egypt.'
        };
        
        addUserMessage(this.textContent.trim());
        
        showTypingIndicator();
        setTimeout(function() {
            hideTypingIndicator();
            addBotMessage(responses[reply] || 'Thank you for your interest!', false);
        }, 1200);
    }
    
    // Get bot response
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Services
        if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
            return 'We offer HR Consultancy, HR Management, Training & Development, and Recruitment Services. How can I help you?';
        }
        
        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
            return 'You can reach us at hr@competentrec.com or WhatsApp: 01068046764. We\'re in 6 October, Cairo, Egypt.';
        }
        
        // Recruitment
        if (lowerMessage.includes('recruit') || lowerMessage.includes('hiring') || lowerMessage.includes('job')) {
            return 'Our recruitment services include end-to-end hiring, executive search, and mass recruitment. Would you like to discuss your needs?';
        }
        
        // Training
        if (lowerMessage.includes('training') || lowerMessage.includes('course') || lowerMessage.includes('learn')) {
            return 'We offer customized training programs in various areas. Contact us to discuss your training needs!';
        }
        
        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return 'Hello! How can I assist you today? 😊';
        }
        
        // Thanks
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return 'You\'re welcome! Feel free to ask if you need anything else.';
        }
        
        // Default
        return 'Thank you for your message! For specific inquiries, please contact us at hr@competentrec.com or call 01068046764.';
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingHTML = `
            <div class="message bot typing-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatbotMessages.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        const typingMessage = chatbotMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
    
    // Scroll to bottom
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Get current time
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
})();


// -==================Scroll to Top Button ==================
(function() {
    'use strict';
    
    // Get the button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    function toggleScrollButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }
    
    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleScrollButton);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleScrollButton();
    
    // Optional: Update progress ring (if using progress-style)
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollToTopBtn.style.setProperty('--scroll-progress', scrollPercent + '%');
    }
    
    // Uncomment if using progress-style
    // window.addEventListener('scroll', updateScrollProgress);
    
})();
