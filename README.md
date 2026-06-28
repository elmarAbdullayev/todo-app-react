# Todo App (Full-Stack)

> A full-stack Todo application built with **FastAPI (backend)** and **React (frontend)** featuring JWT authentication, protected routes, and full CRUD functionality.

This project demonstrates a **real-world task management system** with secure authentication, user-specific data handling, and a modern React frontend architecture.

---

## Features

### Authentication System

* User registration and login
* JWT-based authentication
* Password hashing (bcrypt / passlib)
* Protected API routes
* AuthContext in React for global state management
* Persistent login using localStorage

---

### Task Management (CRUD)

* Create tasks
* Read all user tasks
* Update tasks (title, description, completed)
* Delete tasks
* Toggle completion status
* User-specific task isolation (each user sees only their tasks)

---

### Frontend Features (React)

* Authentication pages (Login / Register)
* Protected routing (React Router)
* Global state management (Context API)
* Task filtering:

  * All tasks
  * Completed tasks
  * Active tasks
* Search functionality
* Inline task editing
* Real-time UI updates
* Form validation

---

## Tech Stack

### Backend

* Python 3.11
* FastAPI
* SQLAlchemy ORM
* JWT (python-jose)
* Passlib (bcrypt)
* MySQL / PostgreSQL compatible

### Frontend

* React (TypeScript / JavaScript)
* React Router DOM
* Context API
* Axios
* Bootstrap / CSS

---

## Architecture Overview

```text id="todo_full_arch"
React Frontend
│
├── AuthContext (JWT state management)
├── Login / Register Pages
├── Main Dashboard
│   ├── Task CRUD UI
│   ├── Filtering & Search
│   ├── Inline Editing
│   └── Logout System
│
FastAPI Backend
│
├── Auth Module
│   ├── Register
│   ├── Login (JWT)
│   └── Token Validation
│
├── Task Module
│   ├── Create Task
│   ├── Read Tasks
│   ├── Update Task
│   └── Delete Task
│
Database Layer
├── Users Table
└── Tasks Table (1:N Relationship)
```

---

## Database Design

### User

* id
* username (unique)
* password (hashed)
* tasks (relationship)

### Task

* id
* title
* description
* completed
* user_id (foreign key)

---

## API Endpoints

### Authentication

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/auth/register` | Register new user    |
| POST   | `/auth/login`    | Login and return JWT |

---

### Tasks (Protected Routes)

| Method | Endpoint                | Description     |
| ------ | ----------------------- | --------------- |
| GET    | `/api/get_all_tasks`    | Get all tasks   |
| GET    | `/api/get_task/{id}`    | Get single task |
| POST   | `/api/erstell_task`     | Create task     |
| PUT    | `/api/put_task/{id}`    | Update task     |
| DELETE | `/api/delete_task/{id}` | Delete task     |

---

## Authentication Flow

1. User registers
2. Password is hashed (bcrypt)
3. User logs in
4. Backend returns JWT token
5. Token stored in localStorage
6. AuthContext manages global auth state
7. Protected routes check authentication
8. API requests include token automatically

---

## Frontend Architecture

### State Management

* AuthContext handles:

  * user
  * token
  * login/logout/register
  * authentication state

---

### Task Features

* Fetch tasks on load
* Filter tasks (all / active / completed)
* Search tasks by title
* Inline editing mode
* Optimistic UI updates

---

### Security on Frontend

* Protected route redirect if not authenticated
* Token stored in localStorage
* Logout clears session

---

## Key Engineering Concepts

This project demonstrates:

* Full-stack authentication flow (JWT)
* REST API design
* CRUD system with user ownership
* React Context API for state management
* Protected routes in React
* Form validation and UX handling
* Optimistic UI updates
* Frontend-backend integration
* Database relationships (1:N)
* Secure password handling

---

## Installation

### 1. Clone repository

```bash id="clone_todo_react"
git clone https://github.com/yourusername/todo-fullstack.git
cd todo-fullstack
```

---

### 2. Backend Setup

```bash id="backend_todo_react"
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 3. Frontend Setup

```bash id="frontend_todo_react"
cd frontend
npm install
npm start
```

---

## Future Improvements

* Refresh token system
* Role-based access (Admin / User)
* Drag & drop task ordering
* Docker deployment
* Unit + integration tests
* WebSocket real-time sync
* PostgreSQL migration
* CI/CD pipeline

---

## Key Highlights (for recruiters)

* Secure JWT authentication system
* Full CRUD application with user isolation
* Modern React architecture (Context API)
* Clean REST API design
* Real-world full-stack structure
* Production-style frontend patterns

---

## Author

Built as a full-stack learning project to master authentication systems, React architecture, and FastAPI backend development.
