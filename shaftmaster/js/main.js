/**
 * ShaftMaster Pro - Main JavaScript
 * Professional Golf Shaft Review Website
 */

(function() {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initMobileNav();
    initFilters();
    initScrollEffects();
    initSmoothScroll();
  }

  // Mobile Navigation
  function initMobileNav() {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const menu = document.querySelector('.nav-mobile-menu');

    if (toggle && menu) {
      toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
      });

      // Close menu when clicking a link
      const mobileLinks = menu.querySelectorAll('.nav-link');
      mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          menu.classList.remove('active');
          toggle.classList.remove('active');
        });
      });

      // Close menu on escape
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
          menu.classList.remove('active');
          toggle.classList.remove('active');
        }
      });
    }
  }

  // Filter Functionality
  function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reviewCards = document.querySelectorAll('.review-card');

    if (filterButtons.length > 0 && reviewCards.length > 0) {
      filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();

          // Update active state
          filterButtons.forEach(function(b) { b.classList.remove('active'); });
          this.classList.add('active');

          // Filter cards
          const filterValue = this.getAttribute('data-filter');
          reviewCards.forEach(function(card) {
            if (filterValue === 'all' || card.getAttribute('data-' + filterValue)) {
              card.style.display = '';
              card.classList.add('fade-in');
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  }

  // Scroll Effects
  function initScrollEffects() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        nav.style.backgroundColor = '#2E2E2E';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      } else {
        nav.style.backgroundColor = '#2E2E2E';
        nav.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    });
  }

  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = 72;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

})();