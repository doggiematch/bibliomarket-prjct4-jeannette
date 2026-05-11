# Bibliomarket 📚

Marketplace de libros de segunda mano donde los usuarios pueden publicar, buscar y reservar libros.

> Proyecto 4 del bootcamp — Semana 2 de backend | Alumna: Jeannette

## Stack técnico

- **Backend:** Node.js v24 + Express v5 + Prisma v6 + PostgreSQL + JWT + Zod + bcryptjs
- **Frontend:** (bonus)
- **Tests:** (pendiente))
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
│   │   └── schema.prisma
│   └── src/
│       ├── controllers/
│       ├── lib/             *(services)*
│       ├── middlewares/     *(iniciado)*
│       ├── routes/          *(iniciado)*
│       ├── schemas/         *(iniciado)*
│       ├── tests/           *(pendiente)*
│       ├── utils/           *(pendiente)*
│       ├── app.js
│       └── server.js
└── frontend/          *(bonus)*
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

| Método | Ruta                 | Descripción         | Auth |
| ------ | -------------------- | ------------------- | ---- |
| GET    | `/`                  | Health check        | —    |
| POST   | `/api/auth/register` | Registro de usuario | —    |
| POST   | `/api/auth/login`    | Login               | —    |

_Más endpoints en desarrollo (Día 2)_

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

### ⏳ Día 3 — Frontend

### ⏳ Día 4 — Integración y pulido

### ⏳ Día 5 — Despliegue y presentación

## Rama activa

Trabajando en rama `day-1` → merge a `main` al completar el día.
