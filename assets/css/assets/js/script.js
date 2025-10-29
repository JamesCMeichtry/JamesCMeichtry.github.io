// Simple fade-in effect when scrolling
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".project-box, .hero, .project-detail, .contact");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});
