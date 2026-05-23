[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vq8_GOgi)

# Task Manager REST API with Authentication

A RESTful API built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. Users can register, log in, and manage their own tasks securely.

---

## 🛠 Tech Stack

- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose**
- **bcryptjs** – password hashing
- **jsonwebtoken** – JWT-based auth
- **Jest** + **Supertest** – testing

---

## 📁 Project Structure

```
├── server.js
├── src/
│   ├── app.js
│   ├── config/db.js
│   ├── middleware/authMiddleware.js
│   ├── models/User.js
│   ├── models/Task.js
│   └── routes/
│       ├── authRoutes.js
│       └── taskRoutes.js
└── tests/
    ├── auth.test.js
    └── tasks.test.js
```

---

## ⚙️ Setup

```bash
git clone <repo-url>
cd task-manager-rest-api-with-authentication-323
npm install
cp .env.example .env   # fill in your MONGO_URI and JWT_SECRET
npm run dev
```

> Requires MongoDB running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) URI in `.env`

---

## 🔌 API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Tasks (`/api/tasks`) — all require `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all your tasks |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## 🧪 Tests

```bash
npm test
```
