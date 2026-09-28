/* ============================================
   AVIOR - JS Compartido Páginas Internas
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupReveal();
  injectFooter();
  setupSedesTabs();
});

/* ---- NAVBAR ---- */
function setupNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    hamburger.classList.toggle('is-open');
  });

  navLinks?.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ---- REVEAL SCROLL ---- */
function setupReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ---- SEDES TABS ---- */
function setupSedesTabs() {
  document.querySelectorAll('.sede-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sede-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.sede-detalle').forEach(d => d.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('sede-' + btn.dataset.sede)?.classList.add('active');
    });
  });
}

/* ---- FOOTER INJECT ---- */
function injectFooter() {
  const placeholder = document.getElementById('footerPlaceholder');
  if (!placeholder) return;
  // Detectar ruta relativa
  const base = window.location.pathname.includes('/pages/') ? '../' : '';
  placeholder.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="nav-logo">
              <div class="nav-logo-icon">
                <img src="${base}assets/logo.png" alt="AVIOR" onerror="this.parentElement.innerHTML='✈'" style="width:100%;height:100%;object-fit:contain;border-radius:6px">
              </div>
              <div class="nav-logo-text"><strong>AVIOR</strong><span>Corporation S.R.L.</span></div>
            </div>
            <p>Centro de Instrucción Aeronáutica Civil certificado por la DGAC Bolivia. Formando los profesionales de la aviación desde hace más de 15 años.</p>
            <div class="footer-social">
              <a href="#" class="social-btn" title="Facebook">f</a>
              <a href="#" class="social-btn" title="Instagram">in</a>
              <a href="#" class="social-btn" title="YouTube">▶</a>
              <a href="https://wa.me/59162530806" class="social-btn" title="WhatsApp">💬</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Carreras</h4>
            <ul>
              <li><a href="${base}pages/carreras.html#piloto">Piloto Civil Comercial</a></li>
              <li><a href="${base}pages/carreras.html#tcp">Tripulante de Cabina</a></li>
              <li><a href="${base}pages/carreras.html#eov">Despachador de Vuelo</a></li>
              <li><a href="${base}pages/especializaciones.html">Especializaciones</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Sedes</h4>
            <ul>
              <li><a href="${base}pages/sedes.html">La Paz · +591 62530806</a></li>
              <li><a href="${base}pages/sedes.html">Cochabamba · +591 77218909</a></li>
              <li><a href="${base}pages/sedes.html">Tarija · +591 75145330</a></li>
              <li><a href="${base}pages/sedes.html">Sucre · +591 69322199</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Aula Virtual</h4>
            <ul>
              <li><a href="${base}login.html">Acceso Estudiantes</a></li>
              <li><a href="${base}login.html">Acceso Instructores</a></li>
              <li><a href="${base}login.html">Administración</a></li>
              <li><a href="${base}pages/nosotros.html">Política de Calidad</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 AVIOR Corporation S.R.L. — Todos los derechos reservados.</p>
          <p>Certificado DGAC Bolivia | RAB 141 | RAB 142</p>
        </div>
      </div>
    </footer>`;
}
