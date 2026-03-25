/* ============================================
   حمام اسطنبول — Script
   Vanilla JS: navbar, smooth scroll, lightbox,
   scroll animations, active nav link
   ============================================ */

(function () {
    'use strict';

    // ---- DOM Elements ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.getElementById('contactForm');
    const backToTopBtn = document.getElementById('backToTop');

    // ---- Navbar Scroll Effect ----
    function handleNavbarScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ---- Mobile Menu Toggle ----
    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when a nav link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // ---- Smooth Scroll ----
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            if (target) {
                var offset = navbar.offsetHeight;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // Also smooth scroll for other anchor links (CTA buttons, footer links)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        // Skip nav links already handled
        if (anchor.classList.contains('nav-link')) return;
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            e.preventDefault();
            var target = document.querySelector(targetId);
            if (target) {
                var offset = navbar.offsetHeight;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ---- Active Nav Link on Scroll ----
    function highlightActiveLink() {
        var scrollPos = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ---- Scroll Reveal (Intersection Observer) ----
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ---- Gallery Lightbox ----
    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var src = this.getAttribute('data-src');
            if (src) {
                lightboxImage.src = src;
                lightboxImage.alt = this.querySelector('img').alt;
                lightbox.classList.add('active');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Handle broken images
    document.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lightboxImage.src = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ---- Contact Form ----
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                alert('شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    // ---- Back to Top Button ----
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Scroll Event Listener ----
    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleNavbarScroll();
                highlightActiveLink();
                toggleBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ---- Init ----
    handleNavbarScroll();
    highlightActiveLink();
    toggleBackToTop();

})();
