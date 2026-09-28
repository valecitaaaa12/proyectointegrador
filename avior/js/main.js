/* ============================================
   AVIOR - Lógica Sitio Público
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR scroll ---- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---- Hamburger ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  /* ---- Cerrar menú al click en link ---- */
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---- Active link en scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));

  /* ---- Reveal on scroll ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- Contador animado ---- */
  function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const counters = e.target.querySelectorAll('[data-count]');
        counters.forEach(c => animateCounter(c, parseInt(c.dataset.count), 1800));
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);

  /* ---- Formulario de contacto ---- */
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Mensaje enviado';
    btn.disabled = true;
    btn.style.background = '#4caf50';
    contactForm.reset();
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  });

  /* ---- Reloj navbar (hora Bolivia) ---- */
  function updateTime() {
    const el = document.getElementById('navTime');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' });
  }
  updateTime();
  setInterval(updateTime, 30000);
});
