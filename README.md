# MERN Intern Assignment 
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/) 
[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://react.dev/) 
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-darkgreen?logo=mongodb)](https://www.mongodb.com/) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A mini MERN stack project to demo **Authentication, Role-based Access, and Dashboard CRUD**.  
Built with **Node.js + Express + MongoDB (Mongoose)** on the backend and **React (Context API)** on the frontend.  

---

## ✨ Features
- **Authentication**: Sign Up / Login with JWT + bcrypt password hashing  
- **Roles**: `Admin` and `Student`  
- **Dashboards**:
  - **Admin** → View all students, Add/Edit/Delete, Pagination  
  - **Student** → View & update own profile  
- **Protected Routes**: Only logged-in users can access  
- **Extras**: Logout, Context API state management  

---

## 📂 Project Structure
```bash
mern-intern/
├─ backend/              # Node.js + Express + MongoDB
│  ├─ middleware/        # Auth & role guards
│  │  ├─ auth.js
│  │  └─ role.js
│  ├─ models/            # DB Schemas
│  │  ├─ Student.js
│  │  └─ User.js
│  ├─ routes/            # API routes
│  │  ├─ auth.js
│  │  └─ students.js
│  ├─ .env.example       # Sample env vars
│  ├─ server.js          # Entry point
│  ├─ package.json
│  └─ package-lock.json
│
└─ frontend/             # React + Vite
   ├─ src/
   │  ├─ components/
   │  │  └─ ProtectedRoute.jsx
   │  ├─ context/
   │  │  └─ AuthContext.jsx
   │  ├─ pages/          # Screens
   │  │  ├─ AdminDashboard.jsx
   │  │  ├─ Login.jsx
   │  │  ├─ Signup.jsx
   │  │  └─ StudentDashboard.jsx
   │  ├─ App.jsx
   │  ├─ api.js
   │  └─ index.jsx
   ├─ index.html
   ├─ vite.config.js
   ├─ package.json
   └─ package-lock.json
```
## 🚦 Run Full Stack
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev

# Open frontend in browser
http://localhost:5173
```

## 🔮 Roadmap
```bash
- Email verification (Nodemailer)
- Forgot/Reset Password
- Profile pic uploads
- Redux Toolkit version
- Deployment → Vercel (frontend) + Render/Heroku (backend) + MongoDB Atlas
```

## 📜 License
MIT License  
Free to use, fork, and hack.  

