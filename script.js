document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.add('active');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        }

        // Close mobile menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    }

    // Change Header Background on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // Add scroll animation reveal for elements
    const revealElements = document.querySelectorAll('.service-card, .gallery-item, .section-title, .footer-info, .footer-links, .footer-contact, .feature-item, .faq-item');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        // Add a slight stagger delay for elements in the same viewport
        el.style.transitionDelay = `${(index % 3) * 0.15}s`;
        revealObserver.observe(el);
    });
});
