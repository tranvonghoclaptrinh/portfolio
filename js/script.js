/* ============================================
   PROFESSIONAL PORTFOLIO - JavaScript
   Interactions, Animations, and Functionality
   ============================================ */

// ============= DOM READY ============= 
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTypingAnimation();
    initPortfolioFilter();
    initTestimonialsCarousel();
    initFormHandling();
    initScrollAnimations();
    initNavLinksScroll();
});

// ============= MOBILE MENU ============= 
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============= TYPING ANIMATION (FIX DÒNG MANUAL) ============= 
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const roles = [
        'Frontend Developer',
        'Backend Engineer',
        'Manual / Automation Tester', // Dòng hay bị khựng
        'Future Business Analyst',
        'Aspiring Solution Architect',
        'Information Systems Student'
    ];
    
    new Typed(typingElement, {
        strings: roles,
        typeSpeed: 50,       
        backSpeed: 30,       
        backDelay: 1500,     
        startDelay: 300,
        loop: true,
        // Tắt smartBackspace để nó xóa hết rồi gõ lại, tránh bị khựng ở ký tự '&'
        smartBackspace: false, 
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true,
    });
}
// ============= PORTFOLIO FILTER ============= 
function initPortfolioFilter() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (tabBtns.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter items with smooth animation
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.6s ease';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ============= TESTIMONIALS CAROUSEL ============= 
function initTestimonialsCarousel() {
    const carousel = document.getElementById('testimonialsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }
    
    function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    }
    
    function prevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    }
    
    // Initialize first card
    showCard(0);
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextCard);
    if (prevBtn) prevBtn.addEventListener('click', prevCard);
    
    // Auto rotate every 5 seconds
    setInterval(nextCard, 5000);
}

// ============= FORM HANDLING ============= 
function initFormHandling() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
            alert('Vui lòng điền đầy đủ tất cả các trường!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Email không hợp lệ!');
            return;
        }
        
        // Success message
        alert('Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. \n\nTôi sẽ liên hệ lại với bạn sớm nhất!');
        form.reset();
    });
    
    // Add input to form (needed for simple form handling)
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach((input, index) => {
        input.name = ['name', 'email', 'phone', 'subject', 'message'][index];
    });
}

// ============= SCROLL ANIMATIONS ============= 
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ============= SMOOTH SCROLL FOR NAV LINKS ============= 
function initNavLinksScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============= SCROLL INDICATOR FADE ============= 
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const scrollTop = window.scrollY;
        scrollIndicator.style.opacity = Math.max(1 - scrollTop / 500, 0);
    }
});

// ============= NAVBAR BORDER ANIMATION ============= 
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(255, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 4px 16px rgba(255, 0, 0, 0.15)';
        }
    }
});
