# MERN Social Media Application / Week 8 Assignment

A full-stack social media application built with MongoDB, Express.js, React, and Node.js. This repository contains the Week 8 assignment submission and a working MERN social media app example with user authentication, posts, comments, and a responsive UI built with Tailwind CSS.

## Highlights

- User registration and login using JWT
- Create and fetch posts
- Real-time comments via Socket.io
- Protected routes and JWT-based authorization
- Vite + React frontend, Node/Express backend, MongoDB

## Quick Start

Prerequisites:
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

1) Install backend dependencies and create `.env` in `backend/`:

```powershell
cd backend
npm install
# create a .env file with MONGO_URI and JWT_SECRET
```

2) Install frontend dependencies and run dev server:

```powershell
cd frontend
npm install
npm run dev
```

3) Start backend (from `backend/`):

```powershell
node server.js
```

The frontend default port is `5173`; backend default is `5000`.

## Project Structure

Top-level layout:

```
 backend/
    models/
    routes/
    middleware/
    server.js
 frontend/
    src/
    package.json
 README.md
```

## API Endpoints (examples)

- `POST /api/users/register`  Register a user
- `POST /api/users/login`  Login
- `GET /api/posts`  Get all posts
- `POST /api/posts`  Create a post (protected)

## Troubleshooting

- If the backend cannot connect to MongoDB, verify `MONGO_URI` in `backend/.env`.
- If the frontend cannot reach the API, confirm backend is running and CORS is configured.

## Submission Notes (Week 8)

This repository contains the Week 8 assignment deliverables. Please confirm the code, documentation, and deployed URL (if any) are included before final submission.

## License

MIT

---
Updated to resolve merge conflict between local assignment README and remote repository README.
