# ⚡ TaskFlow - Task Management System

A modern and responsive Task Management Application built with **React**, designed to help users organize, track, and manage tasks efficiently. The application includes user authentication, role-based access control, task management features, and an admin dashboard for monitoring users and tasks.

---

## 📌 Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Token Authentication
* Role-Based Access Control (User & Admin)
* Secure Logout Functionality

### 📋 Task Management

* Create New Tasks
* Update Existing Tasks
* Delete Tasks
* Task Status Tracking

  * Todo
  * In Progress
  * Done
* Task Priority Levels

  * Low
  * Medium
  * High
* Due Date Management

### 📊 Dashboard Analytics

* Total Tasks Overview
* Pending Tasks Count
* In Progress Tasks Count
* Completed Tasks Count
* Real-Time Statistics

### 👨‍💼 Admin Panel

* View All Users
* Monitor System Statistics
* Track Task Status Distribution
* Manage User Information

### 🎨 User Interface

* Modern Dark Theme
* Responsive Design
* Interactive Toast Notifications
* Modal-Based Forms
* Clean Dashboard Layout
* Mobile-Friendly Design

---

## 🛠️ Technology Stack

### Frontend

* React 18
* React DOM
* JavaScript (ES6+)
* HTML5
* CSS3

### Backend (Expected API)

* Node.js
* Express.js
* JWT Authentication
* REST API

### Database

* MongoDB / SQL Database (Depending on Backend Configuration)

---

## 📂 Project Structure

```bash
TaskFlow/
│
├── frontend/
│   ├── index.html
│   ├── components/
│   ├── styles/
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following software is installed:

* Node.js (v18+ recommended)
* npm
* Git

---

## 📥 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Backend API

Update the API URL if required:

```javascript
const API = "http://localhost:5000/api/v1";
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm install
npm run dev
```

Backend should run at:

```bash
http://localhost:5000
```

### Start Frontend

```bash
cd frontend
npm install
npm start
```

Frontend should run at:

```bash
http://localhost:3000
```

---

## 🔑 Demo Workflow

### Register User

1. Open Application
2. Click Register
3. Enter:

   * Name
   * Email
   * Password
   * Role

### Login

```text
Email: user@example.com
Password: yourpassword
```

### Create Task

* Click "New Task"
* Enter Task Details
* Set Priority
* Set Due Date
* Save Task

---

## 📊 Dashboard Overview

The dashboard provides:

| Metric      | Description           |
| ----------- | --------------------- |
| Total Tasks | Total number of tasks |
| Todo        | Pending tasks         |
| In Progress | Active tasks          |
| Done        | Completed tasks       |

---

## 🔒 Role Permissions

### User

* Create Tasks
* Update Own Tasks
* Delete Own Tasks
* View Personal Dashboard

### Admin

* All User Permissions
* View All Users
* Access Admin Dashboard
* Monitor System Statistics

---

## 📡 API Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Tasks

```http
GET    /api/v1/tasks
POST   /api/v1/tasks
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

### Admin

```http
GET /api/v1/admin/users
GET /api/v1/admin/stats
```

---

## 🎯 Future Enhancements

* Email Notifications
* Task Assignments
* Team Collaboration
* File Attachments
* Activity Logs
* Calendar Integration
* Dark/Light Theme Toggle
* Drag-and-Drop Task Board
* Real-Time Updates with WebSockets

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by Rajat Samarth

---

⭐ If you found this project useful, please give it a star on GitHub!
