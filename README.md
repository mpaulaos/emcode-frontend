# Emcode

Emcode es una plataforma web para aprender y enseñar programación de forma accesible. La aplicación combina contenido educativo, rutas para estudiantes y docentes, herramientas de accesibilidad y un asistente virtual para acompañar al usuario durante la experiencia.

## Visión general

Esta interfaz frontend está construida con React, TypeScript y Vite. Su objetivo es ofrecer una experiencia inclusiva para personas con distintas necesidades de aprendizaje, incorporando:

- navegación y componentes accesibles
- soporte para lectura y síntesis de voz
- filtros de accesibilidad y ajustes visuales
- panel de estudiante y docente
- cursos, lecciones y exploración de contenidos
- asistente de chat integrado

## Tecnologías principales

- React 19
- TypeScript
- Vite 7
- React Router DOM
- Tailwind CSS
- react-aria-components
- lucide-react
- Vitest
- ESLint

## Estructura del proyecto

```text
src/
  assets/             # imágenes y recursos estáticos
  components/         # componentes UI, layout, accesibilidad, chat, cursos, etc.
  context/            # providers y contextos de autenticación/accesibilidad/speech
  hooks/              # hooks reutilizables para API y estado
  lib/                # utilidades de conexión y helpers
  pages/              # vistas organizadas por público, auth, estudiante y docente
  tokens/             # estilos y tokens de diseño
  types/              # tipos TypeScript compartidos
```

## Funcionalidades incluidas

### Experiencia pública
- landing page con presentación de la plataforma
- páginas de cursos, guías y acerca de
- información sobre discapacidades y accesibilidad

### Autenticación
- login y registro de usuarios
- recuperación de sesión mediante almacenamiento local
- protección de rutas para usuarios autenticados

### Perfil y gestión de usuario
- edición de perfil
- cambio de contraseña
- actualización de datos del usuario

### Educación y cursos
- exploración de cursos
- visualización de cursos para docentes y estudiantes
- navegación por lecciones y temas
- flujo de inscripción a cursos

### Accesibilidad
- panel de ajustes de accesibilidad
- filtros de daltonismo
- máscara de lectura
- lector de texto / speech
- soporte para reducción de movimiento y cambios visuales

### Asistente virtual
- widget de chat integrado
- comunicación con un backend mediante la ruta configurada en variables de entorno

## 🛠 Requisitos previos

Asegurate de tener instalado:

- Node.js 18 o superior
- npm o pnpm

## Instalación

1. Cloná el repositorio:

```bash
git clone <repo-url>
cd emcode-frontend
```

2. Instalá las dependencias:

```bash
npm install
```

3. Creá un archivo de entorno con la URL del backend:

```bash
cp .env.example .env
```

Si no existe un archivo .env.example, crea uno manualmente con:

```env
VITE_API_URL=http://localhost:3000
```

> La aplicación usa esta variable para llamar al backend en autenticación, perfil y chat.

## Ejecutar en desarrollo

```bash
npm run dev
```

Luego abrí la URL que indique Vite, normalmente:

```text
http://localhost:5173
```

## Scripts disponibles

```bash
npm run dev       # inicia el servidor de desarrollo
npm run build     # compila para producción
npm run preview   # sirve el build localmente
npm run lint      # ejecuta ESLint
npm run typecheck # valida tipos con TypeScript
npm run test      # ejecuta pruebas con Vitest
```

## Rutas principales

La app usa React Router y define rutas públicas y protegidas, por ejemplo:

- `/` — landing page
- `/cursos` — catálogo público de cursos
- `/login` — inicio de sesión
- `/register` — registro
- `/profile` — perfil del usuario
- `/student` — panel de estudiante
- `/teacher` — panel de docente
- `/courses/:id` — detalle de curso
- `/courses/:courseId/lesson/:topicId/:lessonId` — vista de lección

## 🔧 Variables de entorno

| Variable | Descripción |
| --- | --- |
| `VITE_API_URL` | URL base del backend que expone los endpoints de auth y chat |

## Despliegue en Vercel

El proyecto está preparado para desplegarse en Vercel como una app Vite estática.

### Pasos recomendados

1. Conectá el repositorio en Vercel.
2. Definí el framework como Vite.
3. Configurá la variable de entorno:
   - `VITE_API_URL=<url-del-backend>`
4. El comando de build es:

```bash
npm run build
```

## Notas de desarrollo

- El proyecto usa TypeScript con verificación estricta.
- Los estilos se gestionan con Tailwind y tokens propios en la carpeta de estilos.
- El componente de accesibilidad está integrado globalmente para que se aplique en toda la app.
- Los assets estáticos se ubican en la carpeta [src/assets](src/assets).

## Contribución

Si querés colaborar:

1. Creá una rama para tu cambio.
2. Realizá tus modificaciones.
3. Ejecutá la validación local (`npm run build` o `npm run typecheck`).
4. Abrí un pull request con contexto claro.

## Estado actual

El proyecto ya cuenta con:

- estructura de frontend React/TypeScript
- autenticación y protección de rutas
- vistas para estudiantes y docentes
- componentes de accesibilidad
- integración con backend a través de variables de entorno
