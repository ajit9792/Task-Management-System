# Task Management System (MERN Stack)

A full-stack Task Management System built using the MERN stack as part of the technical selection assignment.  
The application allows users to manage tasks efficiently with authentication, priority handling, pagination, and detailed task views.

---

## 🚀 Features

- User Authentication (JWT based)
- Create, Read, Update, Delete (CRUD) tasks
- Task priority management (High, Medium, Low)
- Task status toggle (Pending / Completed)
- Pagination for task listing
- Dedicated Task Details page
- Role-based access control
- Secure REST APIs
- AJAX-based frontend communication (Axios)

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- HTML, CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📂 Project Structure

Task-Management-System/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── server.js
│ └── package.json

│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system

2️⃣ Backend Setup
cd backend
npm install
node server.js
Create a .env file inside backend:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend will run on:
http://localhost:3000
Backend will run on:
http://localhost:5000

🔗 API Endpoints (Summary)
POST /api/auth/register – Register user
POST /api/auth/login – Login user
POST /api/tasks – Create task
GET /api/tasks – Get all tasks (with pagination)
GET /api/tasks/:id – Get task details
PUT /api/tasks/:id – Update task
DELETE /api/tasks/:id – Delete task

👤 Author
Ajit

