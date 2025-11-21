**Deploying Backend (Render) & Frontend (Vercel)**

- **Backend (Render)**
  - Connect the GitHub repo and create a new Web Service on Render.
  - Set the root directory to `/backend` (Render detects Node projects automatically).
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Environment variables to add in Render Dashboard:
    - `MONGO_URI` = your MongoDB Atlas connection string
    - `JWT_SECRET` = a secure random string
    - `FRONTEND_URL` = your Vercel frontend URL (set after frontend deploy)
  - Render will set `PORT` automatically; the app binds to `process.env.PORT`.

- **Frontend (Vercel)**
  - In Vercel, create a new project and link your GitHub repo.
  - Set the Project Root to `/frontend`.
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Environment Variable (add in Vercel Dashboard or in Project Settings):
    - `VITE_API_URL` = `https://your-backend.onrender.com` (the Render URL)
  - Deploy. Vercel will serve the built static site.

- **Local testing**
  - Backend: `cd backend && npm install && npm run dev` (runs on `PORT` 5000 by default)
  - Frontend: `cd frontend && npm install && npm run dev` (Vite dev server)
  - Use `.env` files locally (see `backend/.env.example` and `frontend/.env.example`).

- **Notes & Security**
  - Never commit `.env` files with secrets. Use the provided `.env.example` files as templates.
  - If a secret was exposed, rotate the DB user password in MongoDB Atlas immediately.
