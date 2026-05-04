/* =========================================================
   Shota Fumoto — Photographer
   Minimal vanilla JS. No external libraries. No tracking.
   ========================================================= */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- Fade in on scroll (Intersection Observer) ---- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(function (el) {
      io.observe(el);
    });
  } else {
    // Fallback: just show everything
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  /* ---- Lightbox for galleries ----
     Activates on any element with class .gallery
     Each .item inside is clickable. */
  var galleries = document.querySelectorAll('.gallery');
  if (galleries.length === 0) return;

  // Build the lightbox DOM once
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML =
    '<button class="lb-close" aria-label="Close">Close</button>' +
    '<button class="lb-prev" aria-label="Previous">Prev</button>' +
    '<button class="lb-next" aria-label="Next">Next</button>' +
    '<img alt="" />' +
    '<div class="lb-counter" aria-live="polite"></div>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector('img');
  var lbCounter = lb.querySelector('.lb-counter');
  var lbClose = lb.querySelector('.lb-close');
  var lbPrev = lb.querySelector('.lb-prev');
  var lbNext = lb.querySelector('.lb-next');

  var currentList = [];
  var currentIndex = 0;
  var lastFocused = null;

  function openLightbox(items, index) {
    currentList = items;
    currentIndex = index;
    lastFocused = document.activeElement;
    update();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function update() {
    if (!currentList.length) return;
    var item = currentList[currentIndex];
    var img = item.querySelector('img');
    if (!img) return;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCounter.textContent = (currentIndex + 1) + ' / ' + currentList.length;
  }

  function next() {
    currentIndex = (currentIndex + 1) % currentList.length;
    update();
  }
  function prev() {
    currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    update();
  }

  galleries.forEach(function (gallery) {
    var items = Array.prototype.slice.call(gallery.querySelectorAll('.item'));
    items.forEach(function (item, idx) {
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.addEventListener('click', function () {
        openLightbox(items, idx);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(items, idx);
        }
      });
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  // Click outside image to close
  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLightbox();
  });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });
})();
