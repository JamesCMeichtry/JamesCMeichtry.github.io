// shared.js — subtle portfolio polish (safe for GitHub Pages)

document.addEventListener('DOMContentLoaded', () => {
  // 1) Reveal on scroll (adds .visible to .reveal blocks)
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach(el => revealObserver.observe(el));

  // 2) Scroll progress bar (only if present)
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
});
