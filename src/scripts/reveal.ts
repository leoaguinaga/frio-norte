// Adds .is-visible to [data-reveal] elements as they enter the viewport.
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
);
document.addEventListener('astro:page-load', () => {
  document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
});
