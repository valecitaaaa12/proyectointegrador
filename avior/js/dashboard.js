/* ============================================
   AVIOR - Dashboard v3 (reescrito limpio)
   ============================================ */
'use strict';

let SESSION = null;

document.addEventListener('DOMContentLoaded', function() {
  SESSION = requireAuth(['admin','instructor','estudiante']);
  if (!SESSION) return;
  setupLayout();
  loadModule('inicio');
  setupClock();
});

/* ---- LAYOUT ---- */
function setupLayout() {
  document.getElementById('userAvatar').textContent = initials(SESSION.nombre);
  document.getElementById('userName').textContent   = SESSION.nombre;
  document.getElementById('userRole').textContent   = rolLabel(SESSION.rol);
  renderSidebarItems();
  var mt = document.getElementById('menuToggle');
  if (mt) mt.addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('open');
  });
  var lb = document.getElementById('logoutBtn');
  if (lb) lb.addEventListener('click', logout);
  var rb = document.getElementById('resetDataBtn');
  if (rb) rb.addEventListener('click', function() {
    if (confirm('¿Resetear datos? Se perderán los cambios.')) {
      localStorage.removeItem('avior_data');
      localStorage.removeItem('avior_data_version');
      location.reload();
    }
  });
}

function rolLabel(r) {
  var m = { admin:'Administrador', instructor:'Instructor', estudiante:'Estudiante' };
  return m[r] || r;
}

/* ---- SIDEBAR ---- */
function renderSidebarItems() {
  var nav = document.getElementById('sidebarNav');
  var items = getSidebarItems(SESSION.rol);
  var html = '';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    if (it.type === 'label') {
      html += '<div class="nav-section-label">' + it.text + '</div>';
    } else {
      html += '<div class="sidebar-item" data-module="' + it.module + '">' +
              '<i class="item-icon">' + it.icon + '</i>' +
              '<span>' + it.label + '</span>' +
              (it.badge ? '<span class="item-badge">' + it.badge + '</span>' : '') +
              '</div>';
    }
  }
  nav.innerHTML = html;
  var els = nav.querySelectorAll('.sidebar-item[data-module]');
  for (var j = 0; j < els.length; j++) {
    els[j].addEventListener('click', function() {
      loadModule(this.dataset.module);
      document.querySelector('.sidebar').classList.remove('open');
    });
  }
}

function getSidebarItems(rol) {
  var base = [
    { type:'label', text:'General' },
    { module:'inicio', icon:'🏠', label:'Inicio' }
  ];
  if (rol === 'admin') {
    return base.concat([
      { type:'label', text:'Gestión' },
      { module:'estudiantes',   icon:'🎓', label:'Estudiantes' },
      { module:'instructores',  icon:'👨\u200d🏫', label:'Instructores' },
      { module:'cursos',        icon:'📚', label:'Cursos' },
      { module:'inscripciones', icon:'📋', label:'Inscripciones' },
      { type:'label', text:'Académico' },
      { module:'notas',         icon:'📝', label:'Calificaciones' },
      { module:'asistencia',    icon:'✅', label:'Lista / Asistencia' },
      { module:'tareas_admin',  icon:'📌', label:'Tareas y Exámenes' },
      { type:'label', text:'Sistema' },
      { module:'reportes',      icon:'📊', label:'Reportes' },
      { module:'anuncios',      icon:'📢', label:'Anuncios' }
    ]);
  }
  if (rol === 'instructor') {
    return base.concat([
      { type:'label', text:'Mis Materias' },
      { module:'mis_materias', icon:'📚', label:'Mis Materias' },
      { type:'label', text:'Aula Virtual' },
      { module:'crear_tarea',  icon:'📌', label:'Tareas y Exámenes' },
      { module:'entregas',     icon:'📥', label:'Entregas' },
      { type:'label', text:'Académico' },
      { module:'notas',        icon:'📝', label:'Calificaciones' },
      { module:'asistencia',   icon:'✅', label:'Lista / Asistencia' },
      { module:'anuncios',     icon:'📢', label:'Anuncios' }
    ]);
  }
  if (rol === 'estudiante') {
    return base.concat([
      { type:'label', text:'Mi Académico' },
      { module:'mis_cursos',    icon:'📚', label:'Mis Cursos' },
      { module:'mis_notas',     icon:'📝', label:'Mis Notas' },
      { module:'mi_asistencia', icon:'✅', label:'Mi Asistencia' },
      { type:'label', text:'Aula Virtual' },
      { module:'mis_tareas',    icon:'📌', label:'Tareas Pendientes' },
      { module:'mis_entregas',  icon:'📤', label:'Mis Entregas' },
      { module:'anuncios',      icon:'📢', label:'Anuncios' }
    ]);
  }
  return base;
}

/* ---- CARGAR MÓDULO ---- */
function loadModule(name) {
  var titles = {
    inicio:'Inicio', estudiantes:'Estudiantes', instructores:'Instructores',
    cursos:'Cursos', inscripciones:'Inscripciones', notas:'Calificaciones',
    asistencia:'Lista / Asistencia', reportes:'Reportes', anuncios:'Anuncios',
    mis_materias:'Mis Materias', crear_tarea:'Tareas y Exámenes',
    tareas_admin:'Tareas y Exámenes', entregas:'Entregas Recibidas',
    mis_cursos:'Mis Cursos', mis_notas:'Mis Notas', mi_asistencia:'Mi Asistencia',
    mis_tareas:'Tareas Pendientes', mis_entregas:'Mis Entregas'
  };
  document.querySelectorAll('.sidebar-item').forEach(function(el) {
    el.classList.toggle('active', el.dataset.module === name);
  });
  var t = document.getElementById('topbarTitle');
  if (t) t.textContent = titles[name] || 'Panel';
  var content = document.getElementById('dashContent');
  var html = '';
  switch (name) {
    case 'inicio':        html = renderInicio();        break;
    case 'estudiantes':   html = renderEstudiantes();   break;
    case 'instructores':  html = renderInstructores();  break;
    case 'cursos':        html = renderCursos();        break;
    case 'inscripciones': html = renderInscripciones(); break;
    case 'notas':         html = renderNotas();         break;
    case 'asistencia':    html = renderAsistencia();    break;
    case 'tareas_admin':
    case 'crear_tarea':   html = renderTareas();        break;
    case 'entregas':      html = renderEntregas();      break;
    case 'reportes':      html = renderReportes();      break;
    case 'anuncios':      html = renderAnuncios();      break;
    case 'mis_materias':  html = renderMisMaterias();   break;
    case 'mis_cursos':    html = renderMisCursos();     break;
    case 'mis_notas':     html = renderMisNotas();      break;
    case 'mi_asistencia': html = renderMiAsistencia();  break;
    case 'mis_tareas':    html = renderMisTareas();     break;
    case 'mis_entregas':  html = renderMisEntregas();   break;
    default: html = '<p style="color:var(--texto-muted);padding:40px">Módulo en desarrollo.</p>';
  }
  content.innerHTML = html;
  bindEvents();
}

/* ---- HELPERS HTML ---- */
function statCard(icon, label, value, change) {
  var cls = change.indexOf('↑') >= 0 ? 'up' : change.indexOf('↓') >= 0 ? 'down' : change.indexOf('⚠') >= 0 ? 'down' : '';
  return '<div class="stat-card">' +
    '<div class="stat-card-icon">' + icon + '</div>' +
    '<div class="stat-card-value">' + value + '</div>' +
    '<div class="stat-card-label">' + label + '</div>' +
    (change ? '<div class="stat-card-change ' + cls + '">' + change + '</div>' : '') +
    '</div>';
}

function statusBadge(estado) {
  var map = { activo:'activo', inactivo:'inactivo', pendiente:'pendiente',
              aprobado:'aprobado', reprobado:'reprobado' };
  var cls = map[estado] || '';
  return '<span class="status ' + cls + '">' + (estado || '—') + '</span>';
}

function barAsis(pct) {
  var cls = pct >= 75 ? 'ok' : pct >= 60 ? 'warn' : 'bad';
  var color = cls === 'ok' ? '#4caf50' : cls === 'warn' ? '#ff9800' : '#f44336';
  return '<div style="display:flex;align-items:center;gap:8px">' +
    '<strong style="width:38px;color:' + color + '">' + pct + '%</strong>' +
    '<div class="asistencia-bar" style="flex:1"><div class="asistencia-fill ' + cls + '" style="width:' + pct + '%"></div></div>' +
    '</div>';
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ---- INICIO ---- */
function renderInicio() {
  var d = getData();
  var html = '';
  if (SESSION.rol === 'estudiante') {
    var misInsc  = d.inscripciones.filter(function(i){ return i.estudiante_id === SESSION.id; });
    var misNotas = d.notas.filter(function(n){ return n.estudiante_id === SESSION.id; });
    var prom = misNotas.length ? (misNotas.reduce(function(a,n){ return a+n.promedio; },0)/misNotas.length).toFixed(1) : '—';
    var pendTar = (d.tareas||[]).filter(function(t){
      if (!misInsc.map(function(i){ return i.curso_id; }).includes(t.curso_id)) return false;
      return !(d.entregas||[]).find(function(e){ return e.tarea_id===t.id && e.estudiante_id===SESSION.id; });
    }).length;
    html += '<div class="stats-grid">' +
      statCard('📚','Cursos Inscritos',misInsc.length,'') +
      statCard('📊','Promedio General',prom,'') +
      statCard('✅','Aprobados',misNotas.filter(function(n){ return n.estado==='aprobado'; }).length,'') +
      statCard('📌','Tareas Pendientes',pendTar, pendTar>0?'⚠ Revisar':'') +
      '</div>';
  } else if (SESSION.rol === 'instructor') {
    var mc = d.cursos.filter(function(c){ return c.instructor_id===SESSION.id; });
    var cids = mc.map(function(c){ return c.id; });
    var nEst = d.inscripciones.filter(function(i){ return cids.includes(i.curso_id); })
      .map(function(i){ return i.estudiante_id; })
      .filter(function(v,i,a){ return a.indexOf(v)===i; }).length;
    var nTar = (d.tareas||[]).filter(function(t){ return cids.includes(t.curso_id); }).length;
    var nPend = (d.entregas||[]).filter(function(e){
      var t = (d.tareas||[]).find(function(x){ return x.id===e.tarea_id; });
      return t && cids.includes(t.curso_id) && e.estado==='pendiente';
    }).length;
    html += '<div class="stats-grid">' +
      statCard('📚','Mis Materias',mc.length,'') +
      statCard('🎓','Estudiantes',nEst,'') +
      statCard('📌','Tareas Creadas',nTar,'') +
      statCard('📥','Entregas por Revisar',nPend,nPend>0?'⚠ Pendientes':'') +
      '</div>';
  } else {
    var tEst  = d.usuarios.filter(function(u){ return u.rol==='estudiante'; }).length;
    var tInst = d.usuarios.filter(function(u){ return u.rol==='instructor'; }).length;
    var tCur  = d.cursos.filter(function(c){ return c.estado==='activo'; }).length;
    var tPend = (d.entregas||[]).filter(function(e){ return e.estado==='pendiente'; }).length;
    html += '<div class="stats-grid">' +
      statCard('🎓','Estudiantes',tEst,'↑ activos') +
      statCard('👨‍🏫','Instructores',tInst,'') +
      statCard('📚','Cursos Activos',tCur,'') +
      statCard('📥','Entregas Pendientes',tPend,tPend>0?'⚠ Sin revisar':'') +
      '</div>';
  }
  html += renderAnunciosWidget(d);
  return html;
}

function renderAnunciosWidget(d) {
  var anuncios = (d.anuncios||[]).slice(-3).reverse();
  var items = '';
  if (anuncios.length) {
    for (var i=0; i<anuncios.length; i++) {
      var a = anuncios[i];
      items += '<div style="background:var(--negro-soft);border-left:3px solid var(--guindo);border-radius:0 8px 8px 0;padding:12px 14px">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:4px">' +
        '<strong style="font-size:.9rem">' + escHtml(a.titulo) + '</strong>' +
        '<span style="font-size:.72rem;color:var(--texto-muted)">' + escHtml(a.fecha) + '</span></div>' +
        '<p style="font-size:.82rem;color:var(--texto-muted);margin:0">' + escHtml(a.contenido.substring(0,100)) + (a.contenido.length>100?'...':'') + '</p>' +
        '</div>';
    }
  } else {
    items = '<p style="color:var(--texto-muted);font-size:.85rem">Sin anuncios recientes.</p>';
  }
  return '<div class="data-section" style="margin-top:20px">' +
    '<div class="data-section-header"><h3>📢 Anuncios Recientes</h3>' +
    '<button class="btn btn-guindo-outline btn-sm" onclick="loadModule(\'anuncios\')">Ver todos</button></div>' +
    '<div style="padding:16px;display:flex;flex-direction:column;gap:12px">' + items + '</div></div>';
}

/* ---- ESTUDIANTES ---- */
function renderEstudiantes() {
  var d = getData();
  var estudiantes = d.usuarios.filter(function(u){ return u.rol==='estudiante'; });
  var rows = '';
  for (var i=0; i<estudiantes.length; i++) {
    var e = estudiantes[i];
    rows += '<tr>' +
      '<td><code style="color:var(--guindo-light)">' + escHtml(e.carnet) + '</code></td>' +
      '<td><strong>' + escHtml(e.nombre) + '</strong></td>' +
      '<td style="color:var(--texto-muted)">' + escHtml(e.email) + '</td>' +
      '<td>' + escHtml(e.carrera||'—') + '</td>' +
      '<td>' + escHtml(e.sede||'—') + '</td>' +
      '<td>' + statusBadge(e.estado) + '</td>' +
      '<td><div class="table-actions">' +
      '<button class="action-btn edit" onclick="editarEstudiante(' + e.id + ')" title="Editar">✏️</button>' +
      '<button class="action-btn delete" onclick="eliminarEstudiante(' + e.id + ')" title="Eliminar">🗑</button>' +
      '</div></td></tr>';
  }
  return '<div class="data-section">' +
    '<div class="data-section-header"><h3>Estudiantes (' + estudiantes.length + ')</h3>' +
    '<div class="data-controls">' +
    '<input class="search-input" id="searchEst" placeholder="🔍 Buscar...">' +
    '<button class="btn btn-primary btn-sm" onclick="openModal(\'modalNuevoEst\')">+ Nuevo</button>' +
    '</div></div>' +
    '<div class="data-table-wrap"><table class="data-table">' +
    '<thead><tr><th>Carnet</th><th>Nombre</th><th>Email</th><th>Carrera</th><th>Sede</th><th>Estado</th><th>Acc.</th></tr></thead>' +
    '<tbody id="tbodyEst">' + rows + '</tbody></table></div></div>' +
    modalNuevoEst();
}

function modalNuevoEst() {
  return '<div class="modal-overlay" id="modalNuevoEst"><div class="modal">' +
    '<div class="modal-header"><h3>Nuevo Estudiante</h3>' +
    '<button class="modal-close" onclick="closeModal(\'modalNuevoEst\')">✕</button></div>' +
    '<div class="modal-body">' +
    '<div class="form-row">' +
    '<div class="form-group"><label>Nombre</label><input type="text" id="estNombre" placeholder="Nombre completo"></div>' +
    '<div class="form-group"><label>Email</label><input type="email" id="estEmail" placeholder="email@avior.edu.bo"></div>' +
    '</div><div class="form-row">' +
    '<div class="form-group"><label>Contraseña</label><input type="password" id="estPass"></div>' +
    '<div class="form-group"><label>CI</label><input type="text" id="estCarnet"></div>' +
    '</div><div class="form-row">' +
    '<div class="form-group"><label>Carrera</label><select id="estCarrera">' +
    '<option value="">—</option><option>TCP</option><option>Piloto Civil</option><option>EOV</option></select></div>' +
    '<div class="form-group"><label>Sede</label><select id="estSede">' +
    '<option>La Paz</option><option>Cochabamba</option><option>Tarija</option><option>Sucre</option></select></div>' +
    '</div><div id="modalErrorEst" class="login-error"></div></div>' +
    '<div class="modal-footer">' +
    '<button class="btn btn-guindo-outline" onclick="closeModal(\'modalNuevoEst\')">Cancelar</button>' +
    '<button class="btn btn-primary" onclick="guardarEstudiante()">Guardar</button>' +
    '</div></div></div>';
}

/* ---- INSTRUCTORES ---- */
function renderInstructores() {
  var d = getData();
  var instructores = d.usuarios.filter(function(u){ return u.rol==='instructor'; });
  var rows = '';
  for (var i=0; i<instructores.length; i++) {
    var ins = instructores[i];
    var nc = d.cursos.filter(function(c){ return c.instructor_id===ins.id; }).length;
    rows += '<tr>' +
      '<td><code style="color:var(--guindo-light)">' + escHtml(ins.carnet) + '</code></td>' +
      '<td><strong>' + escHtml(ins.nombre) + '</strong></td>' +
      '<td style="color:var(--texto-muted)">' + escHtml(ins.email) + '</td>' +
      '<td>' + escHtml(ins.especialidad||'—') + '</td>' +
      '<td><span class="badge">' + nc + '</span></td>' +
      '<td>' + statusBadge(ins.estado) + '</td></tr>';
  }
  return '<div class="data-section">' +
    '<div class="data-section-header"><h3>Instructores (' + instructores.length + ')</h3>' +
    '<div class="data-controls">' +
    '<button class="btn btn-primary btn-sm" onclick="openModal(\'modalNuevoInst\')">+ Nuevo</button>' +
    '</div></div>' +
    '<div class="data-table-wrap"><table class="data-table">' +
    '<thead><tr><th>Carnet</th><th>Nombre</th><th>Email</th><th>Especialidad</th><th>Materias</th><th>Estado</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></div></div>' +
    modalNuevoInst();
}

function modalNuevoInst() {
  return '<div class="modal-overlay" id="modalNuevoInst"><div class="modal">' +
    '<div class="modal-header"><h3>Nuevo Instructor</h3>' +
    '<button class="modal-close" onclick="closeModal(\'modalNuevoInst\')">✕</button></div>' +
    '<div class="modal-body"><div class="form-row">' +
    '<div class="form-group"><label>Nombre</label><input type="text" id="instNombre"></div>' +
    '<div class="form-group"><label>Email</label><input type="email" id="instEmail"></div>' +
    '</div><div class="form-row">' +
    '<div class="form-group"><label>Contraseña</label><input type="password" id="instPass"></div>' +
    '<div class="form-group"><label>Especialidad</label><select id="instEsp">' +
    '<option>TCP</option><option>Piloto Civil</option><option>EOV</option></select></div>' +
    '</div></div>' +
    '<div class="modal-footer">' +
    '<button class="btn btn-guindo-outline" onclick="closeModal(\'modalNuevoInst\')">Cancelar</button>' +
    '<button class="btn btn-primary" onclick="guardarInstructor()">Guardar</button>' +
    '</div></div></div>';
}

/* ---- CURSOS ---- */
function renderCursos() {
  var d = getData();
  var cursos = SESSION.rol==='instructor'
    ? d.cursos.filter(function(c){ return c.instructor_id===SESSION.id; })
    : d.cursos;
  var rows = '';
  for (var i=0; i<cursos.length; i++) {
    var c = cursos[i];
    rows += '<tr>' +
      '<td><code style="color:var(--guindo-light)">' + escHtml(c.codigo) + '</code></td>' +
      '<td><strong>' + escHtml(c.nombre) + '</strong><br><small style="color:var(--texto-muted)">' + escHtml(c.descripcion||'') + '</small></td>' +
      '<td>' + escHtml(c.carrera) + '</td>' +
      '<td>' + escHtml(getNombreUsuario(c.instructor_id)) + '</td>' +
      '<td>' + escHtml(c.duracion) + '</td>' +
      '<td>' + statusBadge(c.estado) + '</td></tr>';
  }
  var addBtn = SESSION.rol==='admin' ? '<button class="btn btn-primary btn-sm" onclick="openModal(\'modalNuevoCurso\')">+ Nuevo Curso</button>' : '';
  return '<div class="data-section">' +
    '<div class="data-section-header"><h3>Cursos (' + cursos.length + ')</h3>' +
    '<div class="data-controls">' + addBtn + '</div></div>' +
    '<div class="data-table-wrap"><table class="data-table">' +
    '<thead><tr><th>Código</th><th>Nombre</th><th>Carrera</th><th>Instructor</th><th>Duración</th><th>Estado</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></div></div>' +
    (SESSION.rol==='admin' ? modalNuevoCurso(d) : '');
}

function modalNuevoCurso(d) {
  var instOpts = '';
  d.usuarios.filter(function(u){ return u.rol==='instructor'; }).forEach(function(u){
    instOpts += '<option value="' + u.id + '">' + escHtml(u.nombre) + '</option>';
  });
  return '<div class="modal-overlay" id="modalNuevoCurso"><div class="modal">' +
    '<div class="modal-header"><h3>Nuevo Curso</h3>' +
    '<button class="modal-close" onclick="closeModal(\'modalNuevoCurso\')">✕</button></div>' +
    '<div class="modal-body"><div class="form-row">' +
    '<div class="form-group"><label>Código</label><input type="text" id="curCodigo"></div>' +
    '<div class="form-group"><label>Nombre</label><input type="text" id="curNombre"></div>' +
    '</div><div class="form-group"><label>Descripción</label><textarea id="curDesc"></textarea></div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label>Carrera</label><select id="curCarrera">' +
    '<option>TCP</option><option>Piloto Civil</option><option>EOV</option></select></div>' +
    '<div class="form-group"><label>Instructor</label><select id="curInstructor">' + instOpts + '</select></div>' +
    '</div><div class="form-row">' +
    '<div class="form-group"><label>Duración</label><input type="text" id="curDuracion" placeholder="Ej: 3 meses"></div>' +
    '<div class="form-group"><label>Créditos</label><input type="number" id="curCreditos" value="4"></div>' +
    '</div></div>' +
    '<div class="modal-footer">' +
    '<button class="btn btn-guindo-outline" onclick="closeModal(\'modalNuevoCurso\')">Cancelar</button>' +
    '<button class="btn btn-primary" onclick="guardarCurso()">Guardar</button>' +
    '</div></div></div>';
}

/* ---- INSCRIPCIONES ---- */
function renderInscripciones() {
  var d = getData();
  var rows = '';
  for (var i=0; i<d.inscripciones.length; i++) {
    var ins = d.inscripciones[i];
    rows += '<tr>' +
      '<td style="color:var(--texto-muted)">' + ins.id + '</td>' +
      '<td>' + escHtml(getNombreUsuario(ins.estudiante_id)) + '</td>' +
      '<td>' + escHtml(getNombreCurso(ins.curso_id)) + '</td>' +
      '<td><span class="badge">' + escHtml(ins.periodo) + '</span></td>' +
      '<td style="color:var(--texto-muted)">' + escHtml(ins.fecha) + '</td>' +
      '<td>' + statusBadge(ins.estado) + '</td></tr>';
  }
  var estOpts = '';
  d.usuarios.filter(function(u){ return u.rol==='estudiante' && u.estado==='activo'; }).forEach(function(u){
    estOpts += '<option value="' + u.id + '">' + escHtml(u.nombre) + '</option>';
  });
  var curOpts = '';
  d.cursos.filter(function(c){ return c.estado==='activo'; }).forEach(function(c){
    curOpts += '<option value="' + c.id + '">' + escHtml(c.codigo) + ' - ' + escHtml(c.nombre) + '</option>';
  });
  return '<div class="data-section">' +
    '<div class="data-section-header"><h3>Inscripciones (' + d.inscripciones.length + ')</h3>' +
    '<button class="btn btn-primary btn-sm" onclick="openModal(\'modalInscripcion\')">+ Nueva</button></div>' +
    '<div class="data-table-wrap"><table class="data-table">' +
    '<thead><tr><th>#</th><th>Estudiante</th><th>Curso</th><th>Período</th><th>Fecha</th><th>Estado</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></div></div>' +
    '<div class="modal-overlay" id="modalInscripcion"><div class="modal">' +
    '<div class="modal-header"><h3>Nueva Inscripción</h3>' +
    '<button class="modal-close" onclick="closeModal(\'modalInscripcion\')">✕</button></div>' +
    '<div class="modal-body">' +
    '<div class="form-group"><label>Estudiante</label><select id="inscEst"><option value="">—</option>' + estOpts + '</select></div>' +
    '<div class="form-group"><label>Curso</label><select id="inscCurso"><option value="">—</option>' + curOpts + '</select></div>' +
    '<div class="form-group"><label>Período</label><input type="text" id="inscPeriodo" value="2025-I"></div>' +
    '</div><div class="modal-footer">' +
    '<button class="btn btn-guindo-outline" onclick="closeModal(\'modalInscripcion\')">Cancelar</button>' +
    '<button class="btn btn-primary" onclick="guardarInscripcion()">Inscribir</button>' +
    '</div></div></div>';
}

/* ---- NOTAS ---- */
function renderNotas() {
  var d = getData();
  var notas = SESSION.rol==='instructor'
    ? d.notas.filter(function(n){ var c=getCursoById(n.curso_id); return c&&c.instructor_id===SESSION.id; })
    : d.notas;
  var rows = '';
  for (var i=0; i<notas.length; i++) {
    var n = notas[i];
    var color = n.promedio>=51 ? '#4caf50' : '#f44336';
    rows += '<tr>' +
      '<td>' + escHtml(getNombreUsuario(n.estudiante_id)) + '</td>' +
      '<td>' + escHtml(getNombreCurso(n.curso_id)) + '</td>' +
      '<td style="text-align:center">' + n.parcial1 + '</td>' +
      '<td style="text-align:center">' + n.parcial2 + '</td>' +
      '<td style="text-align:center">' + n.final + '</td>' +
      '<td style="text-align:center"><strong style="color:' + color + '">' + n.promedio.toFixed(1) + '</strong></td>' +
      '<td>' + statusBadge(n.estado) + '</td>' +
      '<td><button class="action-btn edit" onclick="editarNota(' + n.id + ')">✏️</button></td></tr>';
  }
  var estOpts = '';
  d.usuarios.filter(function(u){ return u.rol==='estudiante'; }).forEach(function(u){
    estOpts += '<option value="' + u.id + '">' + escHtml(u.nombre) + '</option>';
  });
  var curOpts = '';
  d.cursos.forEach(function(c){
    curOpts += '<option value="' + c.id + '">' + escHtml(c.nombre) + '</option>';
  });
  return '<div class="data-section">' +
    '<div class="data-section-header"><h3>Calificaciones</h3>' +
    '<button class="btn btn-primary btn-sm" onclick="openModal(\'modalNota\')">+ Registrar</button></div>' +
    '<div class="data-table-wrap"><table class="data-table">' +
    '<thead><tr><th>Estudiante</th><th>Curso</th><th>P1</th><th>P2</th><th>Final</th><th>Promedio</th><th>Estado</th><th>Acc.</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></div></div>' +
    '<div class="modal-overlay" id="modalNota"><div class="modal">' +
    '<div class="modal-header"><h3 id="modalNotaTitle">Registrar Nota</h3>' +
    '<button class="modal-close" onclick="closeModal(\'modalNota\')">✕</button></div>' +
    '<div class="modal-body"><input type="hidden" id="notaId">' +
    '<div class="form-row">' +
    '<div class="form-group"><label>Estudiante</label><select id="notaEst"><option value="">—</option>' + estOpts + '</select></div>' +
    '<div class="form-group"><label>Curso</label><select id="notaCurso"><option value="">—</option>' + curOpts + '</select></div>' +
    '</div><div class="form-row">' +
    '<div class="form-group"><label>Parcial 1</label><input type="number" id="notaP1" min="0" max="100"></div>' +
    '<div class="form-group"><label>Parcial 2</label><input type="number" id="notaP2" min="0" max="100"></div>' +
    '</div><div class="form-row">' +
    '<div class="form-group"><label>Final</label><input type="number" id="notaFinal" min="0" max="100"></div>' +
    '<div class="form-group"><label>Promedio</label><input type="text" id="notaPromedio" readonly style="opacity:.6"></div>' +
    '</div></div>' +
    '<div class="modal-footer">' +
    '<button class="btn btn-guindo-outline" onclick="closeModal(\'modalNota\')">Cancelar</button>' +
    '<button class="btn btn-primary" onclick="guardarNota()">Guardar</button>' +
    '</div></div></div>';
}

/* ---- ASISTENCIA (instructor/admin) ---- */
function renderAsistencia() {
  if (SESSION.rol === 'estudiante') return renderMiAsistencia();
  var d = getData();
  var cursos = SESSION.rol==='admin'
    ? d.cursos
    : d.cursos.filter(function(c){ return c.instructor_id===SESSION.id; });
  var registros = d.registros_asistencia || [];
  var licencias = d.solicitudes_licencia || [];
  var licPend   = licencias.filter(function(l){ return l.estado==='pendiente'; }).length;

  var cursoOpts = '';
  cursos.forEach(function(c){ cursoOpts += '<option value="' + c.id + '">' + escHtml(c.nombre) + '</option>'; });

  /* Tab registros */
  var regRows = '';
  if (registros.length) {
    for (var i=0; i<registros.length; i++) {
      var r = registros[i];
      var curso = getCursoById(r.curso_id);
      var pres = r.detalle.filter(function(x){ return x.estado==='presente'; }).length;
      var tard = r.detalle.filter(function(x){ return x.estado==='tardanza'; }).length;
      var aus  = r.detalle.filter(function(x){ return x.estado==='ausente';  }).length;
      regRows += '<tr data-curso="' + r.curso_id + '">' +
        '<td><strong>' + escHtml(r.fecha) + '</strong></td>' +
        '<td>' + escHtml(r.sesion) + '</td>' +
        '<td style="color:var(--texto-muted)">' + escHtml(curso?curso.nombre:'—') + '</td>' +
        '<td><span style="color:#4caf50;font-weight:700">' + pres + '</span></td>' +
        '<td><span style="color:#ff9800;font-weight:700">' + tard + '</span></td>' +
        '<td><span style="color:#f44336;font-weight:700">' + aus  + '</span></td>' +
        '<td><div class="table-actions">' +
        '<button class="action-btn view" onclick="verDetalleRegistro(' + r.id + ')" title="Ver">👁</button>' +
        '<button class="action-btn edit" onclick="editarRegistro(' + r.id + ')" title="Editar">✏️</button>' +
        '<button class="action-btn delete" onclick="eliminarRegistro(' + r.id + ')" title="Eliminar">🗑</button>' +
        '</div></td></tr>';
    }
  } else {
    regRows = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--texto-muted)">Sin registros. Usa "Pasar Lista" para crear uno.</td></tr>';
  }

  /* Tab licencias */
  var licRows = '';
  if (licencias.length) {
    for (var j=0; j<licencias.length; j++) {
      var l = licencias[j];
      var est  = getUserById(l.estudiante_id);
      var lcur = getCursoById(l.curso_id);
      var lcolor = l.estado==='aprobado'?'aprobado':l.estado==='rechazado'?'reprobado':'pendiente';
      var accBtns = l.estado==='pendiente'
        ? '<button class="action-btn view" style="background:rgba(76,175,80,.15);color:#4caf50" onclick="resolverLicencia(' + l.id + ',\'aprobado\')" title="Aprobar">✅</button>' +
          '<button class="action-btn delete" onclick="resolverLicencia(' + l.id + ',\'rechazado\')" title="Rechazar">❌</button>'
        : '<button class="action-btn view" onclick="alert(\'Estado: ' + l.estado + '\')">👁</button>';
      licRows += '<tr data-estado="' + l.estado + '">' +
        '<td><strong>' + escHtml(est?est.nombre:'—') + '</strong></td>' +
        '<td style="color:var(--texto-muted)">' + escHtml(lcur?lcur.nombre:'—') + '</td>' +
        '<td style="font-size:.82rem">' + escHtml(l.fecha_inicio) + (l.fecha_fin!==l.fecha_inicio?' → '+l.fecha_fin:'') + '</td>' +
        '<td style="font-size:.82rem">' + escHtml(l.motivo) + '</td>' +
        '<td style="color:var(--guindo-light);font-size:.8rem">' + escHtml(l.documento||'Sin doc.') + '</td>' +
        '<td><span class="status ' + lcolor + '">' + l.estado + '</span></td>' +
        '<td><div class="table-actions">' + accBtns + '</div></td></tr>';
    }
  } else {
    licRows = '<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--texto-muted)">Sin solicitudes.</td></tr>';
  }

  /* Modales */
  var estOpts2='';
  d.usuarios.filter(function(u){ return u.rol==='estudiante'; }).forEach(function(u){
    estOpts2 += '<option value="' + u.id + '">' + escHtml(u.nombre) + ' (' + escHtml(u.carnet) + ')</option>';
  });

  return '<div style="display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap" id="asistTabs">' +
    '<button class="btn btn-primary btn-sm asist-tab" data-tab="registros">📋 Registros</button>' +
    '<button class="btn btn-guindo-outline btn-sm asist-tab" data-tab="nueva">➕ Pasar Lista</button>' +
    '<button class="btn btn-guindo-outline btn-sm asist-tab" data-tab="resumen">📊 Resumen</button>' +
    '<button class="btn btn-guindo-outline btn-sm asist-tab" data-tab="licencias">🗂 Licencias' +
    (licPend>0 ? ' <span class="item-badge">'+licPend+'</span>' : '') + '</button>' +
    '</div>' +

    /* Panel registros */
    '<div class="asist-panel" id="tab-registros">' +
    '<div class="data-section"><div class="data-section-header"><h3>Registros de Asistencia</h3>' +
    '<div class="data-controls"><select class="filter-select" id="filtroRegistroCurso">' +
    '<option value="">Todos los cursos</option>' + cursoOpts + '</select>' +
    '<button class="btn btn-primary btn-sm" onclick="switchTab(\'nueva\')">➕ Pasar Lista</button>' +
    '</div></div>' +
    '<div class="data-table-wrap"><table class="data-table" id="tablaRegistros">' +
    '<thead><tr><th>Fecha</th><th>Sesión</th><th>Curso</th><th>Presentes</th><th>Tardanzas</th><th>Ausentes</th><th>Acciones</th></tr></thead>' +
    '<tbody>' + regRows + '</tbody></table></div></div></div>' +

    /* Panel pasar lista */
    '<div class="asist-panel" id="tab-nueva" style="display:none">' +
    '<div style="display:grid;grid-template-columns:300px 1fr;gap:24px;align-items:start">' +
    '<div class="data-section"><div class="data-section-header"><h3>Configurar Sesión</h3></div>' +
    '<div style="padding:20px;display:flex;flex-direction:column;gap:14px">' +
    '<div class="form-group"><label>Curso</label>' +
    '<select id="asistCurso"><option value="">Seleccionar...</option>' + cursoOpts + '</select></div>' +
    '<div class="form-group"><label>Fecha</label>' +
    '<input type="date" id="asistFecha" value="' + new Date().toISOString().split('T')[0] + '"></div>' +
    '<div class="form-group"><label>Nombre de la Sesión</label>' +
    '<input type="text" id="asistSesion" placeholder="Ej: Clase 3"></div>' +
    '<button class="btn btn-primary" style="width:100%" onclick="cargarAlumnosParaLista()">Cargar Alumnos →</button>' +
    '</div></div>' +
    '<div class="data-section" id="panelListaAlumnos">' +
    '<div class="data-section-header">' +
    '<h3 id="listaTitulo">Selecciona un curso para comenzar</h3>' +
    '<div id="marcacionRapida" style="display:none;gap:8px">' +
    '<button class="btn btn-sm" style="background:rgba(76,175,80,.2);color:#4caf50;border:1px solid #4caf50" onclick="marcarTodos(\'presente\')">✓ Todos presentes</button>' +
    '<button class="btn btn-sm" style="background:rgba(244,67,54,.2);color:#f44336;border:1px solid #f44336" onclick="marcarTodos(\'ausente\')">✗ Todos ausentes</button>' +
    '</div></div>' +
    '<div id="listaAlumnosContainer" style="padding:20px">' +
    '<p style="color:var(--texto-muted);text-align:center">Selecciona un curso y haz clic en Cargar Alumnos.</p></div>' +
    '<div id="btnGuardarLista" style="padding:16px;border-top:1px solid var(--negro-border);display:none">' +
    '<button class="btn btn-primary" style="width:100%;justify-content:center" onclick="guardarListaAsistencia()">💾 Guardar Lista</button>' +
    '</div></div></div></div>' +

    /* Panel resumen */
    '<div class="asist-panel" id="tab-resumen" style="display:none">' +
    '<div class="data-section"><div class="data-section-header"><h3>Resumen por Alumno</h3>' +
    '<div class="data-controls"><select class="filter-select" id="filtroResumenCurso">' +
    '<option value="">Seleccionar curso...</option>' + cursoOpts + '</select>' +
    '<button class="btn btn-primary btn-sm" onclick="renderResumenAsistencia()">Ver</button>' +
    '</div></div>' +
    '<div id="resumenAsistenciaContent" style="padding:20px">' +
    '<p style="color:var(--texto-muted);text-align:center">Selecciona un curso.</p></div></div></div>' +

    /* Panel licencias */
    '<div class="asist-panel" id="tab-licencias" style="display:none">' +
    '<div class="data-section"><div class="data-section-header">' +
    '<h3>Solicitudes de Licencia / Justificación</h3>' +
    '<button class="btn btn-primary btn-sm" onclick="openModal(\'modalNuevaLicencia\')">+ Nueva</button>' +
    '</div>' +
    '<div class="data-table-wrap"><table class="data-table" id="tablaLicencias">' +
    '<thead><tr><th>Estudiante</th><th>Curso</th><th>Fechas</th><th>Motivo</th><th>Documento</th><th>Estado</th><th>Acc.</th></tr></thead>' +
    '<tbody>' + licRows + '</tbody></table></div></div></div>' +

    /* Modal detalle */
    '<div class="modal-overlay" id="modalDetalleRegistro"><div class="modal" style="max-width:680px">' +
    '<div class="modal-header"><h3 id="modalRegistroTitle">Detalle</h3>' +
    '<button class="modal-close" onclick="closeModal(\'modalDetalleRegistro\')">✕</button></div>' +
    '<div class="modal-body" id="modalRegistroBody">—</div>' +
    '<div class="modal-footer">' +
    '<button class="btn btn-guindo-outline" onclick="closeModal(\'modalDetalleRegistro\')">Cerrar</button>' +
    '<button class="btn btn-primary" id="btnGuardarEdicionRegistro" onclick="guardarEdicionRegistro()" style="display:none" data-registro-id="">Guardar Cambios</button>' +
    '</div></div></div>' +

    /* Modal licencia */
    '<div class="modal-overlay" id="modalNuevaLicencia"><div class="modal">' +
    '<div class="modal-header"><h3>Nueva Solicitud de Licencia</h3>' +
    '<button class="modal-close" onclick="closeModal(\'modalNuevaLicencia\')">✕</button></div>' +
    '<div class="modal-body">' +
    '<div class="form-group"><label>Estudiante</label><select id="licEst"><option value="">—</option>' + estOpts2 + '</select></div>' +
    '<div class="form-group"><label>Curso</label><select id="licCurso"><option value="">—</option>' + cursoOpts + '</select></div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label>Fecha Inicio</label><input type="date" id="licFechaI"></div>' +
    '<div class="form-group"><label>Fecha Fin</label><input type="date" id="licFechaF"></div>' +
    '</div><div class="form-group"><label>Motivo</label><select id="licMotivoCat">' +
    '<option>Cita médica</option><option>Enfermedad</option><option>Viaje familiar</option>' +
    '<option>Emergencia familiar</option><option>Trámite oficial</option><option>Otro</option>' +
    '</select></div>' +
    '<div class="form-group"><label>Detalle adicional</label><textarea id="licMotivo" placeholder="Describe el motivo..." style="min-height:70px"></textarea></div>' +
    '<div class="form-group"><label>Documento adjunto (nombre)</label><input type="text" id="licDoc" placeholder="certificado.pdf"></div>' +
    '</div><div class="modal-footer">' +
    '<button class="btn btn-guindo-outline" onclick="closeModal(\'modalNuevaLicencia\')">Cancelar</button>' +
    '<button class="btn btn-primary" onclick="guardarLicencia()">Enviar Solicitud</button>' +
    '</div></div></div>';
}

/* ---- TAREAS ---- */
function renderTareas() {
  var d = getData();
  var cursos = SESSION.rol==='admin'
    ? d.cursos
    : d.cursos.filter(function(c){ return c.instructor_id===SESSION.id; });
  var cids = cursos.map(function(c){ return c.id; });
  var tareas = (d.tareas||[]).filter(function(t){ return cids.indexOf(t.curso_id)>=0; });

  var curOpts = '<option value="">Todos</option>';
  var curOptsF = '<option value="">Seleccionar...</option>';
  cursos.forEach(function(c){
    curOpts  += '<option value="'+c.id+'">'+escHtml(c.nombre)+'</option>';
    curOptsF += '<option value="'+c.id+'">'+escHtml(c.nombre)+'</option>';
  });

  var lista = '';
  if (tareas.length) {
    tareas.forEach(function(t){
      var cur   = getCursoById(t.curso_id);
      var nEnt  = (d.entregas||[]).filter(function(e){ return e.tarea_id===t.id; }).length;
      var nPend = (d.entregas||[]).filter(function(e){ return e.tarea_id===t.id&&e.estado==='pendiente'; }).length;
      var venc  = new Date(t.fecha_limite)<new Date();
      var ico   = {tarea:'📝',examen:'📋',practica:'🔧',proyecto:'🏗'}[t.tipo]||'📌';
      lista += '<div class="tarea-row" data-curso="'+t.curso_id+'">' +
        '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">' +
        '<div style="flex:1;min-width:200px">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">'+ico+
        ' <strong>'+escHtml(t.titulo)+'</strong>' +
        '<span class="status '+(venc?'inactivo':'activo')+'">'+(venc?'Vencida':'Activa')+'</span></div>' +
        '<p style="font-size:.78rem;color:var(--texto-muted);margin:0">'+escHtml(cur?cur.nombre:'—')+
        ' · Límite: '+escHtml(t.fecha_limite)+' · '+t.puntos+' pts</p>' +
        (t.descripcion?'<p style="font-size:.8rem;color:var(--texto-muted);margin-top:4px">'+
        escHtml(t.descripcion.substring(0,80))+(t.descripcion.length>80?'...':'')+'</p>':'')+
        '</div>' +
        '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0">' +
        '<div style="text-align:center"><strong style="color:var(--guindo-light)">'+nEnt+'</strong>'+
        '<p style="font-size:.68rem;color:var(--texto-muted);margin:0">Entregas</p></div>'+
        (nPend>0?'<span class="item-badge">'+nPend+' pend.</span>':'')+
        '<button class="action-btn edit" onclick="editarTarea('+t.id+')">✏️</button>'+
        '<button class="action-btn delete" onclick="eliminarTarea('+t.id+')">🗑</button>'+
        '</div></div></div>';
    });
  } else {
    lista='<div style="padding:40px;text-align:center;color:var(--texto-muted)">Sin tareas. Crea una desde el formulario.</div>';
  }

  return '<div style="display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start">' +
    '<div class="data-section"><div class="data-section-header"><h3>Tareas y Exámenes ('+tareas.length+')</h3>' +
    '<div class="data-controls"><select class="filter-select" id="filterCursoTarea">'+curOpts+'</select></div></div>' +
    '<div id="listaTareas">'+lista+'</div></div>' +
    '<div class="data-section" style="position:sticky;top:20px">' +
    '<div class="data-section-header"><h3 id="formTareaTitle">➕ Nueva Tarea</h3></div>' +
    '<div style="padding:20px;display:flex;flex-direction:column;gap:10px"><input type="hidden" id="tareaId">' +
    '<div class="form-group"><label>Materia</label><select id="tareaCurso">'+curOptsF+'</select></div>' +
    '<div class="form-group"><label>Título</label><input type="text" id="tareaTitulo" placeholder="Título"></div>' +
    '<div class="form-group"><label>Tipo</label><select id="tareaTipo">' +
    '<option value="tarea">📝 Tarea</option><option value="examen">📋 Examen</option>' +
    '<option value="practica">🔧 Práctica</option><option value="proyecto">🏗 Proyecto</option></select></div>' +
    '<div class="form-group"><label>Instrucciones</label><textarea id="tareaDesc" placeholder="Describe la tarea..." style="min-height:80px"></textarea></div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label>Fecha Límite</label><input type="date" id="tareaFecha"></div>' +
    '<div class="form-group"><label>Puntos</label><input type="number" id="tareaPuntos" value="100" min="1"></div>' +
    '</div>' +
    '<button class="btn btn-primary" style="width:100%;justify-content:center" onclick="guardarTarea()">Publicar</button>' +
    '<button class="btn btn-guindo-outline" id="btnCancelarTarea" style="width:100%;justify-content:center;display:none" onclick="resetFormTarea()">Cancelar</button>' +
    '</div></div></div>';
}

/* ---- ENTREGAS ---- */
function renderEntregas() {
  var d = getData();
  var cids = SESSION.rol==='admin'
    ? d.cursos.map(function(c){ return c.id; })
    : d.cursos.filter(function(c){ return c.instructor_id===SESSION.id; }).map(function(c){ return c.id; });
  var tids = (d.tareas||[]).filter(function(t){ return cids.indexOf(t.curso_id)>=0; }).map(function(t){ return t.id; });
  var entregas = (d.entregas||[]).filter(function(e){ return tids.indexOf(e.tarea_id)>=0; });
  var rows = '';
  if (entregas.length) {
    entregas.forEach(function(e){
      var t  = (d.tareas||[]).find(function(x){ return x.id===e.tarea_id; });
      var cu = t?getCursoById(t.curso_id):null;
      var es = getUserById(e.estudiante_id);
      rows += '<tr data-estado="'+e.estado+'">' +
        '<td><strong>'+escHtml(es?es.nombre:'—')+'</strong></td>' +
        '<td>'+escHtml(t?t.titulo:'—')+'</td>' +
        '<td style="color:var(--texto-muted)">'+escHtml(cu?cu.nombre:'—')+'</td>' +
        '<td style="font-size:.8rem;color:var(--texto-muted)">'+escHtml(e.fecha_entrega)+'</td>' +
        '<td style="color:var(--guindo-light);font-size:.82rem">'+escHtml(e.archivo||'Sin archivo')+'</td>' +
        '<td><span class="status '+(e.estado==='revisado'?'aprobado':'pendiente')+'">'+e.estado+'</span></td>' +
        '<td><strong style="color:'+(e.nota!=null&&e.nota>=51?'#4caf50':'#f44336')+'">'+((e.nota!=null)?e.nota:'—')+'</strong></td>' +
        '<td><button class="btn btn-primary btn-sm" onclick="calificarEntrega('+e.id+')">'+(e.estado==='revisado'?'✏ Editar':'✅ Calificar')+'</button></td></tr>';
    });
  } else {
    rows='<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--texto-muted)">Sin entregas.</td></tr>';
  }
  return '<div class="data-section"><div class="data-section-header"><h3>Entregas Recibidas ('+entregas.length+')</h3></div>' +
    '<div class="data-table-wrap"><table class="data-table"><thead><tr>' +
    '<th>Estudiante</th><th>Tarea</th><th>Materia</th><th>Entregado</th><th>Archivo</th><th>Estado</th><th>Nota</th><th>Acción</th>' +
    '</tr></thead><tbody>'+rows+'</tbody></table></div></div>' +
    '<div class="modal-overlay" id="modalCalificar"><div class="modal">' +
    '<div class="modal-header"><h3>Calificar Entrega</h3><button class="modal-close" onclick="closeModal(\'modalCalificar\')">✕</button></div>' +
    '<div class="modal-body"><input type="hidden" id="calEntregaId">' +
    '<div id="calDetalleEntrega" style="background:var(--negro-soft);border-radius:8px;padding:14px;margin-bottom:16px;font-size:.85rem;color:var(--texto-muted)">—</div>' +
    '<div class="form-group"><label>Nota</label><input type="number" id="calNota" min="0"></div>' +
    '<div class="form-group"><label>Retroalimentación</label><textarea id="calFeedback" placeholder="Comentario..." style="min-height:80px"></textarea></div>' +
    '</div><div class="modal-footer">' +
    '<button class="btn btn-guindo-outline" onclick="closeModal(\'modalCalificar\')">Cancelar</button>' +
    '<button class="btn btn-primary" onclick="guardarCalificacion()">Guardar Nota</button>' +
    '</div></div></div>';
}
