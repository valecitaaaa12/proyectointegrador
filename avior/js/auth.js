/* ============================================
   AVIOR - Autenticación y Sesión
   ============================================ */

function login(email, password) {
  const data = getData();
  const user = data.usuarios.find(u =>
    u.email === email && u.password === password && u.estado === 'activo'
  );
  if (user) {
    const session = {
      id:       user.id,
      nombre:   user.nombre,
      email:    user.email,
      rol:      user.rol,
      carnet:   user.carnet,
      carrera:  user.carrera  || null,
      sede:     user.sede     || null,
      especialidad: user.especialidad || null,
      loginAt:  new Date().toISOString(),
    };
    sessionStorage.setItem('avior_session', JSON.stringify(session));
    return { ok: true, user: session };
  }
  return { ok: false, error: 'Credenciales incorrectas o cuenta inactiva.' };
}

function logout() {
  sessionStorage.removeItem('avior_session');
  window.location.href = 'login.html';
}

function getSession() {
  const s = sessionStorage.getItem('avior_session');
  return s ? JSON.parse(s) : null;
}

function requireAuth(allowedRoles) {
  const session = getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  if (allowedRoles && !allowedRoles.includes(session.rol)) {
    window.location.href = 'dashboard.html';
    return null;
  }
  return session;
}

function initials(nombre) {
  return nombre.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
}
