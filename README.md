# CareerPath AI - MERN Stack Application

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017 (or update `.env` in backend)

## Project Structure
- `backend/`: Node.js + Express + MongoDB API
- `frontend/`: React + Vite + Tailwind-ish CSS

## Setup & Run

### 1. Backend
Open a terminal:
```bash
cd backend
npm install
npm run dev
```
The server will start on **http://localhost:5000**.

### 2. Frontend
Open a NEW terminal:
```bash
cd frontend
npm install
npm run dev
```
The application will be available at **http://localhost:5173**.

## Features
- **Authentication**: Register & Login (JWT)
- **Career Quiz**: Determine your ideal career field.
- **Skill Assessment**: Self-assess your level (Beginner/Intermediate/Expert).
- **Dashboard**: View your profile, level, and next steps.
- **Roadmap**: Dynamic roadmap based on your results.
- **Modern UI**: Dark mode, animations, glassmorphism.

## Configuration
- `backend/server.js`: MongoDB Connection (Default: `mongodb://127.0.0.1:27017/careerpath`)
- `frontend/src/api.js`: API Base URL (Default: `http://localhost:5000/api`)
