console.log("Portfolio loaded successfully");
// Scroll progress indicator
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.querySelector('.scroll-progress').style.width = `${progress}%`;
});

