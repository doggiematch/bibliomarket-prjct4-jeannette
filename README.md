# Bibliomarket

Bibliomarket es una aplicación full stack para comprar y vender libros de segunda mano entre particulares.

La idea principal es que cada usuario pueda gestionar su propia biblioteca personal: publicar los libros que tiene en casa y quiere vender, consultar libros de otros usuarios, reservarlos durante un tiempo limitado, guardarlos como favoritos y ponerse en contacto con el vendedor. No está pensada como una tienda de empresa, sino como un espacio de intercambio entre personas.

El proyecto incluye también un rol `ADMIN` y un dashboard básico porque forman parte de la estructura técnica implementada, pero el flujo principal de la aplicación está centrado en usuarios particulares que administran sus propios libros.

> Proyecto 4 del bootcamp — Semana 2 de backend | Alumna: Jeannette

## Stack técnico

- **Backend:** Node.js + Express + Prisma + PostgreSQL + JWT + Zod + bcryptjs
- **Frontend:** React + Vite + React Router + CSS Modules
- **Base de datos:** PostgreSQL local en desarrollo y PostgreSQL en Render para producción
- **Tests:** Vitest + Supertest para auth, books y reservations
- **Despliegue:** Backend en Render, base de datos en Render y frontend en Vercel
- **Entorno:** ES Modules (`import/export`) y variables de entorno (`.env`)

> Nota: el backend estará desplegado en Render Free, por lo que la primera petición puede tardar unos segundos si el servicio estaba inactivo.

## Tecnologías y versiones principales

| Tecnología    | Versión | Uso                                   |
| ------------- | ------- | ------------------------------------- |
| Node.js       | v24     | Entorno de ejecución backend          |
| Express       | v5      | Framework HTTP                        |
| Prisma Client | v6      | ORM y acceso a base de datos          |
| Prisma CLI    | v6      | Migraciones y seed                    |
| PostgreSQL    | v18     | Base de datos relacional              |
| pg            | v8      | Driver PostgreSQL                     |
| jsonwebtoken  | v9      | Autenticación JWT                     |
| bcryptjs      | v3      | Hash de contraseñas                   |
| Zod           | v4      | Validación de datos                   |
| React         | v19     | Interfaz de usuario                   |
| React Router  | v7      | Rutas del frontend                    |
| Vite          | v8      | Desarrollo y build del frontend       |
| Vitest        | v4      | Tests backend                         |
| Supertest     | v7      | Tests de endpoints HTTP               |
| nodemon       | v3      | Hot reload en desarrollo backend      |
| Render        | Free    | Despliegue backend y PostgreSQL cloud |
| Vercel        | Hobby   | Despliegue frontend                   |

## Estructura del proyecto

```
bibliomarket-prjct4-jeannette/
├── README.md
├── ai_log.md
├── backlog.md
├── bibliomarket.postman_collection.json
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── vitest.config.js
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── seed.js
│   │   └── schema.prisma
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── book.controller.js
│       │   ├── favorite.controller.js
│       │   ├── genre.controller.js
│       │   ├── openLibrary.controller.js
│       │   └── reservation.controller.js
│       ├── lib/
│       │   └── prisma.js
│       ├── middlewares/
│       │   ├── auth.js
│       │   ├── errorHandler.js
│       │   └── validate.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── book.routes.js
│       │   ├── favorite.routes.js
│       │   ├── genre.routes.js
│       │   ├── openLibrary.routes.js
│       │   └── reservation.routes.js
│       ├── schemas/
│       │   ├── auth.schema.js
│       │   ├── book.schema.js
│       │   └── reservation.schema.js
│       └── tests/
│           ├── auth.test.js
│           ├── books.test.js
│           └── reservations.test.js
└── frontend/
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Navbar.module.css
        │   └── ProtectedRoute.jsx
        ├── config/
        │   └── api.js
        ├── context/
        │   └── AuthContext.jsx
        ├── hooks/
        │   └── useDebounce.js
        └── pages/
            ├── BookDetail/
            │   ├── BookDetail.jsx
            │   └── BookDetail.module.css
            ├── BookForm/
            │   ├── BookForm.jsx
            │   └── BookForm.module.css
            ├── BookList/
            │   ├── BookList.jsx
            │   └── BookList.module.css
            ├── Dashboard/
            │   ├── Dashboard.jsx
            │   └── Dashboard.module.css
            ├── Home/
            │   ├── Home.jsx
            │   └── Home.module.css
            ├── Login/
            │   ├── Login.jsx
            │   └── Login.module.css
            ├── MyBooks/
            │   ├── MyBooks.jsx
            │   └── MyBooks.module.css
            └── Register/
                ├── Register.jsx
                └── Register.module.css
```

## Puesta en marcha

### Requisitos previos

- Node.js v18+
- PostgreSQL corriendo en local

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tu DATABASE_URL y JWT_SECRET
npx prisma migrate dev --name init
npm run dev
```

### Ejecución del proyecto

Está previsto crear una configuración de `launch` para arrancar backend y frontend de forma cómoda desde el entorno de desarrollo.

Mientras tanto, ambos servicios se ejecutan de manera independiente:

- **Backend:** `npm run dev`
- **Frontend:** `pnpm dev`

Se mantiene `pnpm` en el frontend como decisión preventiva ante incidencias recientes de seguridad en el ecosistema npm, y se conserva `npm` en el backend porque el proyecto ya está configurado con `package-lock.json`.

### Usuario de prueba

Para simular un login con datos del seed, se puede usar:

- **Email:** `carlos@example.com`
- **Contraseña:** `user123`

### Variables de entorno necesarias (`.env.example`)

```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/bibliomarket"
JWT_SECRET="tu_secreto_seguro"
PORT=3000
```

## Modelo de datos

5 tablas principales:

| Tabla         | Descripción                                    |
| ------------- | ---------------------------------------------- |
| `User`        | Personas que compran, venden o reservan        |
| `Book`        | Libros de segunda mano publicados por usuarios |
| `Genre`       | Géneros literarios                             |
| `Reservation` | Reservas temporales de libros                  |
| `Favorite`    | Relación entre usuarios y libros favoritos     |

### Enums

- **Role:** `USER`, `ADMIN`
- **Condition:** estado físico del libro
- **BookStatus:** disponibilidad del libro
- **ReservationStatus:** estado de la reserva

## Endpoints disponibles

| Método | Ruta                        | Descripción                                   | Auth     |
| ------ | --------------------------- | --------------------------------------------- | -------- |
| GET    | `/`                         | Health check                                  | —        |
| POST   | `/api/auth/register`        | Registro de usuario                           | —        |
| POST   | `/api/auth/login`           | Login                                         | —        |
| GET    | `/api/books`                | Listado de libros disponibles                 | Opcional |
| GET    | `/api/books/mine`           | Libros publicados por el usuario autenticado  | JWT      |
| GET    | `/api/books/:id`            | Detalle de un libro                           | —        |
| POST   | `/api/books`                | Crear/publicar un libro                       | JWT      |
| PUT    | `/api/books/:id`            | Editar un libro propio                        | JWT      |
| PATCH  | `/api/books/:id/reactivate` | Reactivar una publicación cancelada           | JWT      |
| DELETE | `/api/books/:id`            | Cancelar/eliminar publicación                 | JWT      |
| DELETE | `/api/books/:id/permanent`  | Eliminar definitivamente un libro propio      | JWT      |
| GET    | `/api/genres`               | Listado de géneros                            | —        |
| GET    | `/api/favorites/mine`       | Favoritos del usuario autenticado             | JWT      |
| POST   | `/api/favorites/:bookId`    | Añadir libro a favoritos                      | JWT      |
| DELETE | `/api/favorites/:bookId`    | Quitar libro de favoritos                     | JWT      |
| GET    | `/api/reservations/mine`    | Reservas del usuario autenticado              | JWT      |
| POST   | `/api/reservations`         | Crear reserva de un libro                     | JWT      |
| DELETE | `/api/reservations/:id`     | Cancelar/eliminar una reserva propia          | JWT      |
| GET    | `/api/open-library/search`  | Buscar libros en Open Library por título/ISBN | —        |

## Progreso del proyecto (he seguido la sugerencia de las instrucciones)

### ✅ Día 1 — Planificación y setup

- [x] Definición del alcance: compraventa de libros de segunda mano entre particulares
- [x] Diseño del modelo de datos (4 tablas: User, Book, Genre, Reservation)
- [x] Repositorio creado y entorno configurado
- [x] Schema de Prisma con enums y relaciones
- [x] Primera migración ejecutada con éxito (no a la primera)
- [x] Autenticación implementada: registro + login con JWT
- [x] Validaciones con Zod (`registerSchema`, `loginSchema`)
- [x] Manejo de errores centralizado (`errorHandler`)
- [x] Servidor corriendo en `http://localhost:3000`
- [x] Endpoint `POST /api/auth/register` probado en Postman — devuelve `user` + `token`

### ✅ Día 2 — Backend: funciones principales

- [x] Endpoints principales del recurso `Book`: listar, detalle, crear, editar y eliminar/cancelar publicación
- [x] Endpoint de géneros (`GET /api/genres`) para alimentar el formulario del frontend
- [x] Endpoint de reservas (`POST /api/reservations`) para reservar libros autenticados
- [x] Middleware de autenticación con JWT (`verifyToken`)
- [x] Middleware de roles preparado (`requireRole`) para rutas protegidas por rol
- [x] Validaciones con Zod para libros, autenticación y reservas
- [x] Manejo de errores centralizado con `errorHandler`
- [x] Seed de desarrollo con usuarios, géneros, libros y reservas
- [x] Tests iniciales para endpoints de libros con Vitest + Supertest
- [ ] Ampliar tests a auth, reservas, géneros y casos protegidos

### ✅ Día 3 — Frontend

- [x] Estructura base del frontend con React Router
- [x] Páginas principales: Home, Login y Registro
- [x] Página de listado de libros (`BookList`)
- [x] Página de detalle del libro (`BookDetail`)
- [x] Formulario de creación y edición de libros (`BookForm`)
- [x] Integración con Open Library para buscar libros por título, autor o ISBN y rellenar automáticamente datos del formulario
- [x] Integración con la API mediante `fetch`
- [x] Envío de token JWT en peticiones protegidas
- [x] Context de usuario autenticado (`AuthContext`)
- [x] Rutas protegidas con `ProtectedRoute`
- [x] Dashboard básico protegido para rol `ADMIN` como funcionalidad secundaria

> **Nota sobre Open Library:** la app usa Open Library como API pública para ayudar a completar los datos de los libros, pero sus respuestas pueden ser muy lentas. Para probar la búsqueda con un ejemplo directo, se puede usar esta página: https://openlibrary.org/works/OL59077W/Marilyn_Monroe?edition=key%3A/books/OL9129006M. O su ISBN concreto que funciona es `9788433966551`.

### ✅ Día 4 — Integración y pulido

- [ ] Integración externa opcional (n8n webhook, email, etc.) — no integrada por ser opcional
- [ ] Mejorar el diseño responsive — pendiente
- [x] Rutas protegidas en el frontend con `ProtectedRoute`
- [x] Manejo de errores en el frontend: estados de carga, mensajes de error y empty states
- [x] Tests adicionales — pendiente ampliar cobertura

### ✅ Día 5 — Despliegue y presentación

- [x] Backend desplegado en Render
- [x] Base de datos PostgreSQL configurada en Render
- [x] Migraciones de Prisma ejecutadas en producción
- [x] Seed ejecutado en la base de datos de producción para cargar géneros y datos de prueba
- [x] Frontend desplegado en Vercel
- [x] Frontend conectado al backend mediante `VITE_API_URL`

## Despliegue

- **Frontend (Vercel):** `https://bibliomarket-prjct4-jeannette.vercel.app/`
- **Backend (Render):** `https://bibliomarket-backend.onrender.com/`
- **Base de datos:** PostgreSQL en Render

El frontend usa la variable de entorno `VITE_API_URL` para conectar con la API desplegada en Render.

> Nota: el backend está desplegado en Render Free, por lo que la primera petición puede tardar unos segundos si el servicio estaba inactivo.

## Checklist de entrega

### Backend

- [x] `npm run dev` funciona sin errores y levanta el servidor en `http://localhost:3000`
- [x] API desplegada y accesible en Render
- [x] Rutas principales desplegadas comprobadas: health check, libros, géneros y login
- [x] `.env` preparado con las variables necesarias: `DATABASE_URL`, `JWT_SECRET` y `PORT`
- [ ] `npm test` pendiente de repetir con una base de datos accesible desde el entorno local
- [ ] Revisión completa de todas las rutas en Postman/Thunder Client pendiente de última comprobación manual

### Frontend

- [x] `npm run dev` funciona sin errores y levanta Vite en `http://localhost:5173`
- [x] Build de producción ejecutado correctamente con `npm run build`
- [x] Frontend desplegado y accesible en Vercel
- [x] Login comprobado contra la API desplegada
- [ ] Registro y CRUD principal pendientes de última comprobación manual de extremo a extremo
- [ ] Diseño responsive pendiente de última revisión manual en móvil

### General

- [x] README con descripción, instrucciones de instalación, endpoints y despliegue
- [x] `.gitignore` incluye `node_modules/` y `.env`
- [x] No hay credenciales reales en el código fuente; las contraseñas visibles corresponden a datos de prueba del seed/Postman

## Rama activa

Últimas actualizaciones trabajando en rama `main`.
