/* =========================================================
   Shota Fumoto — Photographer
   Slider + modals. Vanilla JS, no dependencies.
   ========================================================= */
(function () {
  'use strict';

  /* ---- Slider ---- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var prev = document.querySelector('.slider-prev');
  var next = document.querySelector('.slider-next');
  var curEl = document.querySelector('.slider-counter .cur');
  var totalEl = document.querySelector('.slider-counter .total');
  var current = 0;

  if (totalEl) totalEl.textContent = slides.length;

  function show(index) {
    if (slides.length === 0) return;
    var n = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      s.classList.toggle('is-active', i === n);
    });
    if (curEl) curEl.textContent = n + 1;
    current = n;

    // Eager-load the next two upcoming images for smoother nav
    var upcoming = [(n + 1) % slides.length, (n + 2) % slides.length];
    upcoming.forEach(function (i) {
      var img = slides[i] && slides[i].querySelector('img');
      if (img && img.loading === 'lazy') img.loading = 'eager';
    });
  }

  function nextSlide() { show(current + 1); }
  function prevSlide() { show(current - 1); }

  if (next) next.addEventListener('click', nextSlide);
  if (prev) prev.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // Don't hijack keys while a modal is open
    if (document.querySelector('.modal.is-open')) return;
    if (e.key === 'ArrowRight') { nextSlide(); }
    else if (e.key === 'ArrowLeft') { prevSlide(); }
  });

  // Touch/swipe support
  var touchStartX = null;
  var sliderEl = document.querySelector('.slider');
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
    }, { passive: true });

    sliderEl.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var dx = (e.changedTouches[0].clientX) - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) nextSlide();
        else prevSlide();
      }
      touchStartX = null;
    }, { passive: true });
  }

  // Click on the photo itself advances
  slides.forEach(function (slide) {
    slide.addEventListener('click', function (e) {
      // ignore clicks on the controls themselves
      if (e.target.closest('.slider-nav') || e.target.closest('.modal-close')) return;
      nextSlide();
    });
  });

  /* ---- Modals (About / Contact) ---- */
  var openers = document.querySelectorAll('[data-open]');
  var closers = document.querySelectorAll('[data-close]');

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function closeAllModals() {
    document.querySelectorAll('.modal.is-open').forEach(closeModal);
  }

  openers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.dataset.open);
    });
  });

  closers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = btn.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  // Click outside modal-inner to close
  document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal(modal);
    });
  });

  // ESC closes any open modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllModals();
  });
})();
