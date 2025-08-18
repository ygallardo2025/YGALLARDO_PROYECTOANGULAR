# Proyecto Angular – Gestión Académica

Aplicación Angular con **componentes standalone**, **lazy loading** y **zoneless change detection**, para gestionar:
- **Estudiantes**
- **Cursos**
- **Inscripciones** (enrollment) de estudiantes a cursos

UI basada en **Angular Material (MatTable)** y estilos Bootstrap.

---

## Demo rápido

- Navegación:
  - `Dashboard` (ruta por defecto)
  - `Estudiantes`
  - `Cursos`
  - `Inscripciones`
- Cada sección lista datos en una tabla y ofrece formulario para **crear/editar** y acciones para **eliminar**.
- Los módulos/feature se cargan **lazy** (via `loadComponent`).

---

## Requisitos

- Node.js 18+ (recomendado)
- Angular CLI 17/18 (`npm i -g @angular/cli`)
- **Opcional**: `json-server` para usar `db.json` local (`npm i -g json-server`)

---

## Instalación

```bash
npm install
