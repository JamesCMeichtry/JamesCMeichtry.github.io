/* shared.js - IntersectionObserver, parallax, tilt, accents */

// IntersectionObserver fade-in (stagger for project cards)
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // stagger project-card children if present
        const cards = entry.target.querySelectorAll('.project-card');
        cards.forEach((c, i) => {
          c.style.transitionDelay = `${i * 120}ms`;
          c.classList.add('visible');
        });

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  sections.forEach(s => io.observe(s));
});

// Parallax background movement on scroll
(function() {
  const parallaxSections = document.querySelectorAll('section[data-parallax-speed]');
  function moveParallax() {
    const scrolled = window.scrollY;
    parallaxSections.forEach(sec => {
      const speed = parseFloat(sec.dataset.parallaxSpeed) || 0.2;
      sec.style.backgroundPosition = `center ${-scrolled * speed}px`;
    });
  }
  window.addEventListener('scroll', moveParallax, { passive: true });
  // call once to set initial position
  moveParallax();
})();

// Project card tilt effect (mouse)
(function() {
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      const rotY = (x - 0.5) * 10; // degrees
      const rotX = (0.5 - y) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// Optional: subtle float animation for the accent blobs
(function() {
  const accents = document.querySelectorAll('.float-accent');
  let t = 0;
  function animateAccents() {
    t += 0.01;
    accents.forEach((ac, i) => {
      const ry = Math.sin(t * (0.6 + i*0.2)) * 10; // px offset
      ac.style.transform = `translate(-50%,-50%) translateY(${ry}px)`;
    });
    requestAnimationFrame(animateAccents);
  }
  // start only if accents exist
  if (accents.length) requestAnimationFrame(animateAccents);
})();
