# ⚡ TaskFlow API

> Scalable REST API with JWT Authentication & Role-Based Access Control

A production-ready backend API built with **Node.js + Express**, featuring full authentication, CRUD operations, Swagger documentation, and a clean React frontend — built for the Primetrade.ai Backend Developer Intern assignment.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| **Auth** | Register/Login with bcrypt + JWT |
| **RBAC** | `user` and `admin` roles with middleware |
| **Tasks CRUD** | Create, Read, Update, Delete with filtering |
| **Validation** | express-validator on all inputs |
| **API Versioning** | `/api/v1/...` |
| **Swagger Docs** | Interactive UI at `/api/docs` |
| **Frontend** | Vanilla React UI — no build step |
| **Database** | In-memory (demo) or PostgreSQL (production) |
| **Docker** | docker-compose for full stack |

---

## 🚀 Quick Start (2 minutes)

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/taskflow-api.git
cd taskflow-api/backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env — the defaults work for demo mode
```

### 3. Start the API

```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 4. Open the frontend

Open `frontend/index.html` directly in your browser (no build needed).
Or serve it:
```bash
npx serve frontend
```

---

## 📡 API Endpoints

### Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | — | Register new user |
| POST | `/login` | — | Login, get JWT |
| GET | `/me` | ✅ | Get own profile |
| PUT | `/me` | ✅ | Update profile |

### Tasks — `/api/v1/tasks`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/` | ✅ | any | List tasks (own or all for admin) |
| GET | `/:id` | ✅ | any | Get task by ID |
| POST | `/` | ✅ | any | Create task |
| PUT | `/:id` | ✅ | owner/admin | Update task |
| DELETE | `/:id` | ✅ | owner/admin | Delete task |

**Query params for GET /tasks:** `?status=todo&priority=high`

### Admin — `/api/v1/admin` (admin role required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | All users |
| GET | `/stats` | System stats |
| DELETE | `/users/:id` | Delete user |

---

## 🔐 Authentication

All protected endpoints require:
```
Authorization: Bearer <token>
```

Get your token from `/api/v1/auth/login` or `/api/v1/auth/register`.

---

## 📖 API Documentation

Interactive Swagger UI: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

- Click **Authorize** → paste `Bearer <your_token>`
- Try all endpoints directly in the browser

---

## 🐳 Docker (Full Stack)

```bash
# From project root:
docker-compose up

# API:      http://localhost:5000
# Docs:     http://localhost:5000/api/docs
# Postgres: localhost:5432
# Redis:    localhost:6379
```

---

## 🗃️ Database

### Demo Mode (default)
Runs with in-memory store — no setup needed. Data resets on restart.

### PostgreSQL (production)
```bash
# Create database
createdb taskflow_db

# Run schema
psql -U postgres -d taskflow_db -f backend/schema.sql

# Update .env with your credentials, then uncomment PostgreSQL code in:
# backend/src/config/database.js
```

---

## 📁 Project Structure

```
taskflow-api/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js    # DB (in-memory / PostgreSQL)
│   │   │   └── swagger.js     # OpenAPI spec
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── task.controller.js
│   │   │   └── admin.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.js        # JWT verify + authorize()
│   │   │   ├── validate.js    # Validation error handler
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── task.routes.js
│   │   │   └── admin.routes.js
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   └── response.js
│   │   ├── validators/
│   │   │   ├── auth.validator.js
│   │   │   └── task.validator.js
│   │   └── app.js             # Entry point
│   ├── schema.sql             # PostgreSQL schema
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   └── index.html             # Single-file React UI
├── docker-compose.yml
├── SCALABILITY.md
└── README.md
```

---

## 🛡️ Security

- **Passwords:** bcrypt with 12 salt rounds
- **Tokens:** JWT signed with secret, 7-day expiry
- **Headers:** Helmet.js (XSS, CSRF protection)
- **CORS:** Whitelist of allowed origins
- **Validation:** express-validator sanitizes all inputs
- **RBAC:** Middleware enforces role checks server-side

---

## 📊 Tech Stack

| Layer      | Tech |
|----------- |------|
| Runtime    | Node.js 20 |
| Framework  | Express.js 4 |
| Auth       | bcryptjs + jsonwebtoken |
| Validation | express-validator |
| Docs       | Swagger UI + swagger-jsdoc |
| Database   | PostgreSQL / In-memory |
| Security   | Helmet, CORS |
| Frontend   | Vanilla React (CDN) |
| DevOps     | Docker + docker-compose |

---

## 🧪 Testing the API

### curl examples

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","password":"pass123","role":"admin"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"pass123"}'

# Create task (replace TOKEN)
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Build the API","priority":"high","status":"in_progress"}'

# List tasks with filter
curl http://localhost:5000/api/v1/tasks?status=todo \
  -H "Authorization: Bearer TOKEN"
```



