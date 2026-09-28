# 🌿 Estrategia de Ramificación — AVIOR Corporation

## 📋 Estrategia: Git Flow Adaptado

Este proyecto utiliza una versión adaptada de **Git Flow** para gestionar el desarrollo colaborativo, aunque el equipo está conformado por una sola persona (Natalia Valentina Valda Ibáñez). La estrategia permite simular un flujo de trabajo profesional con Pull Requests y revisión de código.

---

## 🌳 Estructura de Ramas

```
main (producción)
  │
  ├── develop (desarrollo)
  │     │
  │     ├── feature/AVIOR-001-sitio-institucional
  │     ├── feature/AVIOR-002-sistema-autenticacion
  │     ├── feature/AVIOR-003-dashboard-academico
  │     ├── feature/AVIOR-004-paginas-secundarias
  │     └── feature/AVIOR-005-mejoras-ux
  │
  └── hotfix/ (correcciones urgentes)
```

---

## 📏 Convención de Nombres

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| **Feature** | `feature/AVIOR-XXX-descripcion-corta` | `feature/AVIOR-001-sitio-institucional` |
| **Bugfix** | `bugfix/AVIOR-XXX-descripcion-corta` | `bugfix/AVIOR-002-fix-login` |
| **Hotfix** | `hotfix/AVIOR-XXX-descripcion-corta` | `hotfix/AVIOR-003-fix-critical` |
| **Release** | `release/vX.X.X` | `release/v1.0.0` |

> **Nota:** El código `AVIOR-XXX` corresponde al ID de la historia en JIRA.

---

## 🔄 Flujo de Trabajo

### 1. Crear una rama de feature
```bash
git checkout develop
git pull origin develop
git checkout -b feature/AVIOR-XXX-descripcion
```

### 2. Desarrollar y hacer commits
```bash
git add .
git commit -m "feat(AVIOR-XXX): descripción del cambio"
```

### 3. Subir la rama a GitHub
```bash
git push -u origin feature/AVIOR-XXX-descripcion
```

### 4. Crear Pull Request (PR)
- Ir a GitHub → Pull Requests → New Pull Request
- Seleccionar: `feature/AVIOR-XXX-descripcion` → `develop`
- Agregar descripción y revisores
- Asociar con la historia de JIRA

### 5. Revisar y mergear
- Revisar el código (auto-revisión)
- Aprobar el PR
- Mergear a `develop`
- Eliminar la rama de feature

### 6. Actualizar develop
```bash
git checkout develop
git pull origin develop
```

---

## 📋 Relación con JIRA

Cada rama está asociada a una historia de usuario en JIRA:

| ID JIRA | Historia | Rama | Estado |
|---------|----------|------|--------|
| AVIOR-001 | Sitio Institucional | `feature/AVIOR-001-sitio-institucional` | ✅ Completado |
| AVIOR-002 | Sistema de Autenticación | `feature/AVIOR-002-sistema-autenticacion` | ✅ Completado |
| AVIOR-003 | Dashboard Académico | `feature/AVIOR-003-dashboard-academico` | ✅ Completado |
| AVIOR-004 | Páginas Secundarias | `feature/AVIOR-004-paginas-secundarias` | ✅ Completado |
| AVIOR-005 | Mejoras UX/UI | `feature/AVIOR-005-mejoras-ux` | 🔄 En progreso |

---

## 🎯 Pull Requests

### ¿Por qué usar Pull Requests?

1. **Revisión de código:** Permite auto-revisar los cambios antes de integrarlos
2. **Trazabilidad:** Cada cambio está documentado y asociado a una historia
3. **Calidad:** Se pueden agregar checks automáticos (CI/CD)
4. **Colaboración:** Si se agrega más gente al equipo, el flujo ya está establecido

### Estructura de un PR

```markdown
## 📋 Descripción
[Descripción de los cambios]

## 🎯 Historia de JIRA
- ID: AVIOR-XXX
- Título: [Título de la historia]

## ✅ Checklist
- [ ] Código revisado
- [ ] Tests pasando (si aplica)
- [ ] Documentación actualizada
- [ ] Sin conflictos con develop

## 📸 Screenshots (si aplica)
[Capturas de pantalla]
```

---

## 📝 Convención de Commits

Formato: `tipo(alcance): descripción`

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(AVIOR-001): agregar formulario de contacto` |
| `fix` | Corrección de bug | `fix(AVIOR-002): corregir validación de login` |
| `docs` | Documentación | `docs: actualizar README` |
| `style` | Estilos (no afecta lógica) | `style(AVIOR-001): ajustar colores del hero` |
| `refactor` | Refactorización | `refactor(AVIOR-003): optimizar dashboard` |
| `test` | Tests | `test(AVIOR-002): agregar tests de auth` |
| `chore` | Tareas de mantenimiento | `chore: actualizar dependencias` |

---

## 🚀 Comandos Útiles

```bash
# Ver ramas
git branch -a

# Cambiar de rama
git checkout nombre-rama

# Eliminar rama local
git branch -d nombre-rama

# Eliminar rama remota
git push origin --delete nombre-rama

# Ver historial
git log --oneline --graph --all

# Actualizar develop
git checkout develop
git pull origin develop
```

---

## 📚 Referencias

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [JIRA Integration](https://support.atlassian.com/jira-software-cloud/docs/integrate-with-jira/)
