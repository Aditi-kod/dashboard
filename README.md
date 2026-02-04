# Frontend Developer Intern Assignment

## Tech Stack
Frontend:
- React.js
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Features
- User Signup & Login
- JWT-based authentication
- Protected Dashboard
- Profile fetch & update
- CRUD for tasks/notes
- Search & filter
- Logout flow

## Setup Instructions

### Backend
cd backend
npm install
npm run dev

### Create .env:
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret

### Frontend
cd frontend
npm install
npm run dev

## Postman Collections

POST /api/v1/auth/signup 201 250.913 ms - 263
POST /api/v1/auth/login 200 164.127 ms - 263
GET /api/v1/tasks 200 29.049 ms - 2
GET /api/v1/tasks 304 12.118 ms - -
POST /api/v1/tasks 201 16.032 ms - 202
GET /api/v1/tasks 200 13.738 ms - 204
DELETE /api/v1/tasks/698332a5d8cd918b1e9e8715 200 45.011 ms - 26
GET /api/v1/tasks 200 13.754 ms - 2
GET /api/v1/tasks 304 35.226 ms - -
GET /api/v1/tasks 304 15.286 ms - -


## Scaling for Production

Use Docker for containerization

Deploy frontend on Vercel, backend on AWS/GCP

Enable CORS properly

Use refresh tokens

Add DB indexing and pagination

Add Redis caching

Documented by-
Aditi Kumari




