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
    const clearBtn = document.querySelector('.filter-clear-btn');

    if (filterButtons.length > 0 && reviewCards.length > 0) {
      // Track active filters by category
      const activeFilters = {
        flex: 'all',
        weight: 'all',
        type: 'all'
      };

      filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();

          // Get filter type category
          const filterValue = this.getAttribute('data-filter');
          const category = filterValue.split('-')[0];
          const isAllButton = filterValue.endsWith('-all');

          // Update active state for buttons in same category
          const categoryButtons = document.querySelectorAll('[data-filter^="' + category + '-"]');
          categoryButtons.forEach(function(b) { b.classList.remove('active'); });
          this.classList.add('active');

          // If clicking "All" button in a category, clear ONLY that category's filter
          // while keeping other categories' filters intact
          if (isAllButton) {
            activeFilters[category] = 'all';
          } else {
            // Store active filter (specific value like "flex-regular")
            activeFilters[category] = filterValue;
          }

          // Apply all filters with AND logic
          applyFilters(reviewCards, activeFilters);
        });
      });

      // Clear all filters
      if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
          e.preventDefault();

          // Reset all filter buttons
          filterButtons.forEach(function(btn) {
            if (btn.getAttribute('data-filter') === 'flex-all' ||
                btn.getAttribute('data-filter') === 'weight-all' ||
                btn.getAttribute('data-filter') === 'type-all') {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });

          // Reset active filters
          activeFilters.flex = 'all';
          activeFilters.weight = 'all';
          activeFilters.type = 'all';

          // Show all cards
          reviewCards.forEach(function(card) {
            card.style.display = '';
            card.classList.add('fade-in');
          });
        });
      }
    }

    // Apply filters function
    function applyFilters(cards, filters) {
      cards.forEach(function(card) {
        // Check each category
        let showCard = true;

        // Flex filter - filter value is like "flex-regular", we need to check "data-flex-regular"
        if (filters.flex !== 'all') {
          const flexValue = filters.flex.replace('flex-', ''); // "regular"
          const flexAttr = 'data-flex-' + flexValue;
          if (!card.hasAttribute(flexAttr)) showCard = false;
        }

        // Weight filter
        if (filters.weight !== 'all' && showCard) {
          const weightValue = filters.weight.replace('weight-', ''); // "light", "mid", or "heavy"
          const weightAttr = 'data-weight-' + weightValue;
          if (!card.hasAttribute(weightAttr)) showCard = false;
        }

        // Type filter
        if (filters.type !== 'all' && showCard) {
          const typeValue = filters.type.replace('type-', ''); // "graphite"
          const typeAttr = 'data-type-' + typeValue;
          if (!card.hasAttribute(typeAttr)) showCard = false;
        }

        if (showCard) {
          card.style.display = '';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
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