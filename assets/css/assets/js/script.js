// Simple animation on load
document.addEventListener("DOMContentLoaded", () => {
  const heroText = document.querySelector(".hero h2");
  if (heroText) {
    heroText.style.opacity = 0;
    heroText.style.transition = "opacity 1.5s ease";
    setTimeout(() => (heroText.style.opacity = 1), 300);
  }
});
