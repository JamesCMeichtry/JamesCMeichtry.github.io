l(function () {
‘use strict’;

/* ── Scroll progress bar ── */
const bar = document.querySelector(’.scroll-progress’);
function updateProgress() {
if (!bar) return;
const scrollTop  = window.scrollY;
const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
bar.style.width  = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + ‘%’;
}

/* ── Header shadow on scroll ── */
const hdr = document.querySelector(‘header’);
function updateHeader() {
if (!hdr) return;
hdr.classList.toggle(‘scrolled’, window.scrollY > 20);
}

/* ── Hamburger / mobile nav ── */
const hamburger = document.querySelector(’.hamburger’);
const mobileNav  = document.querySelector(’.mobile-nav’);

function closeMenu() {
if (!hamburger || !mobileNav) return;
hamburger.classList.remove(‘open’);
mobileNav.classList.remove(‘open’);
hamburger.setAttribute(‘aria-expanded’, ‘false’);
document.body.style.overflow = ‘’;
}

if (hamburger) {
hamburger.setAttribute(‘aria-label’, ‘Toggle navigation’);
hamburger.setAttribute(‘aria-expanded’, ‘false’);
hamburger.addEventListener(‘click’, function () {
const isOpen = hamburger.classList.toggle(‘open’);
mobileNav && mobileNav.classList.toggle(‘open’, isOpen);
hamburger.setAttribute(‘aria-expanded’, String(isOpen));
document.body.style.overflow = isOpen ? ‘hidden’ : ‘’;
});
}

if (mobileNav) {
mobileNav.querySelectorAll(‘a’).forEach(function (a) {
a.addEventListener(‘click’, closeMenu);
});
}

document.addEventListener(‘click’, function (e) {
if (!hdr) return;
if (!hdr.contains(e.target) && mobileNav && !mobileNav.contains(e.target)) closeMenu();
});

document.addEventListener(‘keydown’, function (e) {
if (e.key === ‘Escape’) closeMenu();
});

/* ── Scroll reveal ── */
function initReveal() {
var els = document.querySelectorAll(’.reveal’);
if (!els.length) return;

```
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

els.forEach(function (el) { observer.observe(el); });
```

}

/* ── Throttled scroll handler ── */
var ticking = false;
window.addEventListener(‘scroll’, function () {
if (!ticking) {
requestAnimationFrame(function () {
updateProgress();
updateHeader();
ticking = false;
});
ticking = true;
}
}, { passive: true });

/* ── Init ── */
function init() {
updateProgress();
updateHeader();
initReveal();
}

document.readyState === ‘loading’
? document.addEventListener(‘DOMContentLoaded’, init)
: init();

})();