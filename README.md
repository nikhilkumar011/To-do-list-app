# Backendurl Render : https://to-do-list-app-puc2.onrender.com/
# FrontEnd url netlify : https://todolistmernstk.netlify.app/

# To-Do List App - Frontend
## Overview

This is the frontend of a To-Do List application built using React. It allows users to create, read, update, delete, and manage tasks. The frontend communicates with a backend API (hosted separately) to persist and retrieve data, creating a fully functional To-Do List app.

# Features:

Add new tasks

Edit task names

Delete tasks

Toggle task completion status

Display all tasks dynamically

Responsive UI

# API endpoints
GET /todos/ – Get all tasks.

POST /todos/ – Add a new task.

PUT /todos/:id – Toggle a task’s completed status.

PATCH /todos/:id – Edit a task’s name.

DELETE /todos/:id – Delete a task.

# How to run frontend

Navigate to frontend folder:
cd frontend

Install dependencies:
npm install

Run the frontend:
npm run dev

# How to run backend

Navigate to backend folder:
cd backend

Install dependencies:
npm install

Run the server:
node server.js

# .env file
## for frontend : VITE_API_URL = https://to-do-list-app-puc2.onrender.com/todos

## for backend  : MONGO_URI = mongodb+srv://nikhilkumar0112358_db_user:Cg4VUFjQRc5sCwba@cluster1.zu5wa3o.mongodb.net/?appName=Cluster1
