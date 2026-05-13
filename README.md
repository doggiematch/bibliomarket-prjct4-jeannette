# Bibliomarket

Marketplace de libros de segunda mano donde los usuarios pueden publicar, buscar y reservar libros.

> Proyecto 4 del bootcamp — Semana 2 de backend | Alumna: Jeannette

## Stack técnico

- **Backend:** Node.js v24 + Express v5 + Prisma v6 + PostgreSQL + JWT + Zod + bcryptjs
- **Frontend:** React + React Router + CSS Modules
- **Tests:** (comenzado)
- **Entorno:** ES Modules (`import/export`)

## Tecnologías y versiones backend (ver package.json)

| Tecnología   | Versión | Uso                      |
| ------------ | ------- | ------------------------ |
| Node.js      | v24     | Entorno de ejecución     |
| Express      | v5      | Framework HTTP           |
| Prisma       | v6      | ORM y migraciones        |
| PostgreSQL   | v18     | Base de datos            |
| jsonwebtoken | v9      | Autenticación JWT        |
| bcryptjs     | v3      | Hash de contraseñas      |
| Zod          | v3      | Validación de datos      |
| nodemon      | v3      | Hot reload en desarrollo |

## Estructura del proyecto

```
bibliomarket-prjct4-jeannette/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── seed.js
│   │   └── schema.prisma
│   └── src/
│       ├── controllers/
│       ├── lib/
│       ├── middlewares/
│       ├── routes/
│       ├── schemas/
│       ├── tests/
│       ├── app.js
│       └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── config/
        ├── context/
        ├── hooks/
        ├── pages/
        ├── App.jsx
        └── main.jsx
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

4 tablas principales:

| Tabla         | Descripción                |
| ------------- | -------------------------- |
| `User`        | Usuarios de la plataforma  |
| `Book`        | Libros publicados en venta |
| `Genre`       | Géneros literarios         |
| `Reservation` | Reservas de libros         |

### Enums

- **Role:** `USER`, `ADMIN`
- **Condition:** estado físico del libro
- **BookStatus:** disponibilidad del libro
- **ReservationStatus:** estado de la reserva

## Endpoints disponibles

| Método | Ruta                 | Descripción                         | Auth |
| ------ | -------------------- | ----------------------------------- | ---- |
| GET    | `/`                  | Health check                        | —    |
| POST   | `/api/auth/register` | Registro de usuario                 | —    |
| POST   | `/api/auth/login`    | Login                               | —    |
| GET    | `/api/books`         | Listado de libros disponibles       | —    |
| GET    | `/api/books/:id`     | Detalle de un libro                 | —    |
| POST   | `/api/books`         | Crear/publicar un libro             | JWT  |
| PUT    | `/api/books/:id`     | Editar un libro propio o como admin | JWT  |
| DELETE | `/api/books/:id`     | Cancelar/eliminar publicación       | JWT  |
| GET    | `/api/genres`        | Listado de géneros                  | —    |
| POST   | `/api/reservations`  | Crear reserva de un libro           | JWT  |

## Progreso del proyecto (he seguido la sugerencia de las instrucciones)

### ✅ Día 1 — Planificación y setup

- [x] Definición del alcance: marketplace de libros de segunda mano
- [x] Diseño del modelo de datos (4 tablas: User, Book, Genre, Reservation)
- [x] Repositorio creado y entorno configurado
- [x] Schema de Prisma con enums y relaciones
- [x] Primera migración ejecutada con éxito (no a la primera)
- [x] Autenticación implementada: registro + login con JWT
- [x] Validaciones con Zod (`registerSchema`, `loginSchema`)
- [x] Manejo de errores centralizado (`errorHandler`)
- [x] Servidor corriendo en `http://localhost:3000`
- [x] Endpoint `POST /api/auth/register` probado en Postman — devuelve `user` + `token`

### 🔄 Día 2 — Backend: funciones principales

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

### ⏳ Día 3 — Frontend

- [x] Estructura base del frontend con React Router
- [x] Páginas principales: Home, Login y Registro
- [x] Página de listado de libros (`BookList`)
- [x] Página de detalle del libro (`BookDetail`)
- [x] Formulario de creación y edición de libros (`BookForm`)
- [x] Integración con la API mediante `fetch`
- [x] Envío de token JWT en peticiones protegidas
- [x] Context de usuario autenticado (`AuthContext`)
- [x] Rutas protegidas con `ProtectedRoute`
- [x] Dashboard básico protegido para rol `ADMIN`

### ⏳ Día 4 — Integración y pulido

### ⏳ Día 5 — Despliegue y presentación

## Rama activa

Trabajando en rama `day-3` → merge a `main` al completar el día.
