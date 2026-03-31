(function () {
  'use strict';
  var bar = document.querySelector('.scroll-progress');
  function updateProgress() {
    if (!bar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
  var hdr = document.querySelector('header');
  function updateHeader() {
    if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 24);
  }
  var burger = document.querySelector('.hamburger');
  var mob    = document.querySelector('.mobile-nav');
  function closeMenu() {
    if (!burger || !mob) return;
    burger.classList.remove('open');
    mob.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (burger) {
    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('open');
      if (mob) mob.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  if (mob) mob.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('click', function (e) {
    if (hdr && mob && !hdr.contains(e.target) && !mob.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }
  var tick = false;
  window.addEventListener('scroll', function () {
    if (!tick) {
      requestAnimationFrame(function () { updateProgress(); updateHeader(); tick = false; });
      tick = true;
    }
  }, { passive: true });
  function init() { updateProgress(); updateHeader(); initReveal(); }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init) : init();
})();
