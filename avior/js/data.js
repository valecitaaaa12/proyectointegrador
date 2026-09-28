/* ============================================
   AVIOR - Datos simulados (localStorage)
   ============================================ */

const AVIOR_DATA = {

  usuarios: [
    { id: 1, nombre: 'Admin Principal', email: 'admin@avior.edu.bo',   password: 'admin123',   rol: 'admin',      estado: 'activo', carnet: 'ADM-001' },
    { id: 2, nombre: 'Carlos Mamani',   email: 'cmamani@avior.edu.bo', password: 'inst123',    rol: 'instructor', estado: 'activo', carnet: 'INS-001', especialidad: 'Piloto Civil' },
    { id: 3, nombre: 'Lucía Quispe',    email: 'lquispe@avior.edu.bo', password: 'inst123',    rol: 'instructor', estado: 'activo', carnet: 'INS-002', especialidad: 'TCP' },
    { id: 4, nombre: 'Roberto Flores',  email: 'rflores@avior.edu.bo', password: 'inst123',    rol: 'instructor', estado: 'activo', carnet: 'INS-003', especialidad: 'Despachador de Vuelo' },
    { id: 5, nombre: 'Ana Condori',     email: 'acondori@avior.edu.bo',password: 'est123',     rol: 'estudiante', estado: 'activo', carnet: 'EST-001', carrera: 'TCP',    sede: 'La Paz' },
    { id: 6, nombre: 'Juan Morales',    email: 'jmorales@avior.edu.bo',password: 'est123',     rol: 'estudiante', estado: 'activo', carnet: 'EST-002', carrera: 'Piloto Civil', sede: 'Tarija' },
    { id: 7, nombre: 'María Torrez',    email: 'mtorrez@avior.edu.bo', password: 'est123',     rol: 'estudiante', estado: 'activo', carnet: 'EST-003', carrera: 'TCP',    sede: 'La Paz' },
    { id: 8, nombre: 'Diego Alvarez',   email: 'dalvarez@avior.edu.bo',password: 'est123',     rol: 'estudiante', estado: 'activo', carnet: 'EST-004', carrera: 'EOV',    sede: 'Sucre' },
    { id: 9, nombre: 'Sofia Gutiérrez', email: 'sgutierrez@avior.edu.bo', password: 'est123',  rol: 'estudiante', estado: 'inactivo', carnet: 'EST-005', carrera: 'Piloto Civil', sede: 'La Paz' },
  ],

  cursos: [
    { id: 1, codigo: 'TCP-101', nombre: 'Servicio a Bordo',            carrera: 'TCP',    instructor_id: 3, creditos: 4, duracion: '3 meses',  estado: 'activo',   descripcion: 'Fundamentos del servicio al pasajero en cabina' },
    { id: 2, codigo: 'TCP-102', nombre: 'Seguridad Aeronáutica',       carrera: 'TCP',    instructor_id: 3, creditos: 5, duracion: '2 meses',  estado: 'activo',   descripcion: 'Procedimientos de seguridad y emergencia' },
    { id: 3, codigo: 'PC-101',  nombre: 'Meteorología Aeronáutica',    carrera: 'PC',     instructor_id: 2, creditos: 6, duracion: '4 meses',  estado: 'activo',   descripcion: 'Fenómenos meteorológicos aplicados a la aviación' },
    { id: 4, codigo: 'PC-102',  nombre: 'Navegación Aérea',            carrera: 'PC',     instructor_id: 2, creditos: 6, duracion: '4 meses',  estado: 'activo',   descripcion: 'Técnicas de navegación y planificación de vuelo' },
    { id: 5, codigo: 'EOV-101', nombre: 'Operaciones Aeroportuarias',  carrera: 'EOV',    instructor_id: 4, creditos: 5, duracion: '3 meses',  estado: 'activo',   descripcion: 'Gestión y coordinación de operaciones en tierra' },
    { id: 6, codigo: 'EOV-102', nombre: 'Planificación de Vuelo',      carrera: 'EOV',    instructor_id: 4, creditos: 5, duracion: '3 meses',  estado: 'inactivo', descripcion: 'Elaboración de planes de vuelo y documentación' },
  ],

  inscripciones: [
    { id: 1, estudiante_id: 5, curso_id: 1, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 2, estudiante_id: 5, curso_id: 2, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 3, estudiante_id: 6, curso_id: 3, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 4, estudiante_id: 6, curso_id: 4, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 5, estudiante_id: 7, curso_id: 1, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 6, estudiante_id: 7, curso_id: 2, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 7, estudiante_id: 8, curso_id: 5, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
  ],

  notas: [
    { id:  1, estudiante_id: 5, curso_id: 1, parcial1: 75, parcial2: 82, final: 78, promedio: 78.3, estado: 'aprobado' },
    { id:  2, estudiante_id: 5, curso_id: 2, parcial1: 90, parcial2: 88, final: 92, promedio: 90.0, estado: 'aprobado' },
    { id:  3, estudiante_id: 6, curso_id: 3, parcial1: 60, parcial2: 55, final: 58, promedio: 57.7, estado: 'reprobado' },
    { id:  4, estudiante_id: 6, curso_id: 4, parcial1: 85, parcial2: 80, final: 88, promedio: 84.3, estado: 'aprobado' },
    { id:  5, estudiante_id: 7, curso_id: 1, parcial1: 70, parcial2: 75, final: 72, promedio: 72.3, estado: 'aprobado' },
    { id:  6, estudiante_id: 7, curso_id: 2, parcial1: 55, parcial2: 60, final: 50, promedio: 55.0, estado: 'reprobado' },
    { id:  7, estudiante_id: 8, curso_id: 5, parcial1: 88, parcial2: 91, final: 90, promedio: 89.7, estado: 'aprobado' },
  ],

  tareas: [
    { id:1, curso_id:1, titulo:'Tarea 1 — Protocolos de Servicio', tipo:'tarea',
      descripcion:'Elabora un resumen de los protocolos de servicio a bordo vistos en clase. Mínimo 2 páginas.',
      fecha_limite:'2025-07-15', puntos:100, creado_por:3, fecha_creacion:'2025-06-01' },
    { id:2, curso_id:1, titulo:'Examen Parcial 1 — Servicio a Bordo', tipo:'examen',
      descripcion:'Examen sobre los temas de la primera unidad. Incluye preguntas de selección múltiple y desarrollo.',
      fecha_limite:'2025-07-20', puntos:100, creado_por:3, fecha_creacion:'2025-06-05' },
    { id:3, curso_id:3, titulo:'Práctica — Carta de Navegación', tipo:'practica',
      descripcion:'Completa la carta de navegación con los datos proporcionados en clase.',
      fecha_limite:'2025-07-10', puntos:50, creado_por:2, fecha_creacion:'2025-06-03' },
    { id:4, curso_id:5, titulo:'Proyecto — Plan de Vuelo Completo', tipo:'proyecto',
      descripcion:'Elabora un plan de vuelo completo para la ruta LPZ-VVI incluyendo toda la documentación requerida.',
      fecha_limite:'2025-08-01', puntos:150, creado_por:4, fecha_creacion:'2025-06-10' },
  ],

  entregas: [
    { id:1, tarea_id:1, estudiante_id:5, comentario:'Adjunto mi resumen sobre los protocolos de servicio.',
      archivo:'tarea1_acondori.pdf', fecha_entrega:'2025-07-12', estado:'revisado', nota:88, feedback:'Excelente trabajo, buena síntesis.' },
    { id:2, tarea_id:3, estudiante_id:6, comentario:'Completé la carta de navegación según las indicaciones.',
      archivo:'practica_carta_jmorales.pdf', fecha_entrega:'2025-07-09', estado:'pendiente', nota:null, feedback:null },
  ],

  anuncios: [
    { id:1, titulo:'Inicio del nuevo período académico 2025-II', tipo:'academico',
      contenido:'Se informa a todos los estudiantes que el período 2025-II comenzará el 4 de agosto. Las inscripciones estarán abiertas hasta el 28 de julio.',
      autor:'Administración AVIOR', fecha:'15/06/2025' },
    { id:2, titulo:'Mantenimiento de simuladores de vuelo', tipo:'info',
      contenido:'Los simuladores de vuelo estarán en mantenimiento los días 20 y 21 de junio. Las clases prácticas de esos días serán reprogramadas.',
      autor:'Gerencia Académica', fecha:'16/06/2025' },
  ],

  registros_asistencia: [
    { id:1, curso_id:1, fecha:'2025-06-02', sesion:'Clase 1 — Introducción', creado_por:3,
      detalle:[
        { estudiante_id:5, estado:'presente', hora_llegada:'08:30', nota:'' },
        { estudiante_id:7, estado:'tardanza', hora_llegada:'09:10', nota:'Llegó 40 min tarde' },
      ]
    },
    { id:2, curso_id:1, fecha:'2025-06-04', sesion:'Clase 2 — Protocolos', creado_por:3,
      detalle:[
        { estudiante_id:5, estado:'presente', hora_llegada:'08:30', nota:'' },
        { estudiante_id:7, estado:'ausente',  hora_llegada:'',      nota:'Sin justificación' },
      ]
    },
    { id:3, curso_id:3, fecha:'2025-06-03', sesion:'Clase 1 — Meteorología Básica', creado_por:2,
      detalle:[
        { estudiante_id:6, estado:'presente', hora_llegada:'08:30', nota:'' },
      ]
    },
  ],

  solicitudes_licencia: [
    { id:1, estudiante_id:5, curso_id:1, fecha_inicio:'2025-06-10', fecha_fin:'2025-06-10',
      motivo:'Cita médica', documento:'certificado_medico.pdf', estado:'aprobado',
      revisado_por:3, fecha_solicitud:'2025-06-08' },
    { id:2, estudiante_id:6, curso_id:3, fecha_inicio:'2025-06-15', fecha_fin:'2025-06-16',
      motivo:'Viaje familiar urgente', documento:'', estado:'pendiente',
      revisado_por:null, fecha_solicitud:'2025-06-12' },
  ],

  asistencia: [
    { id: 1, estudiante_id: 5, curso_id: 1, total_clases: 20, asistidas: 18, porcentaje: 90 },
    { id: 2, estudiante_id: 5, curso_id: 2, total_clases: 15, asistidas: 15, porcentaje: 100 },
    { id: 3, estudiante_id: 6, curso_id: 3, total_clases: 22, asistidas: 14, porcentaje: 64 },
    { id: 4, estudiante_id: 6, curso_id: 4, total_clases: 22, asistidas: 20, porcentaje: 91 },
    { id: 5, estudiante_id: 7, curso_id: 1, total_clases: 20, asistidas: 16, porcentaje: 80 },
    { id: 6, estudiante_id: 7, curso_id: 2, total_clases: 15, asistidas: 10, porcentaje: 67 },
    { id: 7, estudiante_id: 8, curso_id: 5, total_clases: 18, asistidas: 18, porcentaje: 100 },
  ],
};

/* ---- Inicializar datos en localStorage ---- */
const DATA_VERSION = '4'; // incrementar al agregar campos nuevos

function initData() {
  const stored = localStorage.getItem('avior_data');
  const version = localStorage.getItem('avior_data_version');
  // Si no hay datos O la versión es distinta, reiniciar con datos frescos
  if (!stored || version !== DATA_VERSION) {
    localStorage.setItem('avior_data', JSON.stringify(AVIOR_DATA));
    localStorage.setItem('avior_data_version', DATA_VERSION);
  } else {
    // Migración: asegurar que los arrays nuevos existan aunque sea vacíos
    const d = JSON.parse(stored);
    let changed = false;
    ['tareas','entregas','anuncios','registros_asistencia','solicitudes_licencia'].forEach(key => {
      if (!d[key]) { d[key] = AVIOR_DATA[key] || []; changed = true; }
    });
    if (changed) localStorage.setItem('avior_data', JSON.stringify(d));
  }
}

function getData() {
  const d = localStorage.getItem('avior_data');
  const parsed = d ? JSON.parse(d) : AVIOR_DATA;
  // Garantizar arrays nuevos siempre presentes
  ['tareas','entregas','anuncios','registros_asistencia','solicitudes_licencia'].forEach(key => {
    if (!parsed[key]) parsed[key] = [];
  });
  return parsed;
}

function saveData(data) {
  localStorage.setItem('avior_data', JSON.stringify(data));
}

/* ---- Helpers ---- */
function getNextId(arr) {
  return arr.length ? Math.max(...arr.map(i => i.id)) + 1 : 1;
}

function getUserById(id) {
  return getData().usuarios.find(u => u.id === id);
}

function getCursoById(id) {
  return getData().cursos.find(c => c.id === id);
}

function getNombreUsuario(id) {
  const u = getUserById(id);
  return u ? u.nombre : '—';
}

function getNombreCurso(id) {
  const c = getCursoById(id);
  return c ? c.nombre : '—';
}

initData();
