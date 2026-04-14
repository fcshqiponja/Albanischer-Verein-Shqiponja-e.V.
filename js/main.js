// =========================================
// Albanischer Verein Shqiponja e.V.
// Main JavaScript
// =========================================

(function () {
  'use strict';

  // --- Sticky Header ---
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // --- Mobile Navigation ---
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  const navLinks = navList.querySelectorAll('.nav__link');

  navToggle.addEventListener('click', function () {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.classList.toggle('active', isOpen);
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      navToggle.classList.remove('active');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) {
      navList.classList.remove('open');
      navToggle.classList.remove('active');
    }
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector('.nav__link[href="#' + sectionId + '"]');

      if (link) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // --- Scroll Animations (IntersectionObserver) ---
  const animatedElements = document.querySelectorAll(
    '.card, .event, .membership__card, .about__text, .about__image, .contact__form, .contact__info, .section__header'
  );

  animatedElements.forEach(function (el, i) {
    el.classList.add('fade-in');
    if (i % 3 === 1) el.classList.add('fade-in-delay-1');
    if (i % 3 === 2) el.classList.add('fade-in-delay-2');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Wird gesendet...';

      // Simulate sending (replace with actual backend call)
      setTimeout(function () {
        contactForm.reset();
        formSuccess.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Nachricht senden';

        setTimeout(function () {
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1000);
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height'), 10) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
