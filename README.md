# 📝 MERN Task Manager Application

A full-stack Task Management Application built using the MERN Stack (MongoDB, Express, React, Node.js).

This application provides secure authentication and full CRUD functionality for managing personal tasks.

## 🚀 Features

### 🔐 Authentication
User Registration
User Login
JWT-based Authentication
Protected Routes

### 📌 Task Management
Create Task
Get All Tasks (User-specific)
Update Task
Delete Task

### 💻 Frontend
React-based UI
Login & Register Pages
Dashboard
API Integration with Backend

## 🛠️ Tech Stack

### Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT
bcrypt
dotenv
CORS

### Frontend
React.js
Axios
React Router
Basic CSS styling

## 📂 Project Structure
```
task-manager-mern/
│
├── backend/
├── frontend/
├── postman_collection.json
└── README.md
```

## ⚙️ How To Run This Project Locally

### 🔹 Step 1 — Clone Repository
```
git clone https://github.com/Atharv964/task-manager-mern.git
cd task-manager-mern
```

### 🔹 Step 2 — Setup Backend
```
cd backend
npm install
```

#### Create a .env file inside backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### Start backend server:
```
npm start dev
```

#### Backend runs on:
```
http://localhost:5000
```

### 🔹 Step 3 — Setup Frontend

#### Open new terminal:
```
cd frontend
npm install
npm start dev
```

## 🔐 API Endpoints

### Register User
#### POST /register
```
{
  "name": "Atharv",
  "email": "atharv@email.com",
  "password": "123456"
}
```

### Login User
#### POST /login
```
{
  "email": "atharv@email.com",
  "password": "123456"
}
```

#### Returns:
```
JWT Token
```

## Task Routes (Protected)

### All task routes require header:

```Authorization: Bearer <token>```


### Create Task

```POST /api/tasks```

### Get All Tasks

```GET /api/tasks```

### Update Task

```PUT /api/tasks/:id```

### Delete Task

```DELETE /api/tasks/:id```

## 🧪 API Testing

#### You can test APIs using:

[Postman](https://www.postman.com)
[hoppscotch](https://hoppscotch.io)

#### The Postman collection file is included:

```postman_collection.json```

Import into Postman for quick testing.

## 📘 Architecture Overview
```
Frontend (React)
⬇
Backend (Node + Express)
⬇
MongoDB Database
```

JWT is used for authentication between frontend and backend.

## 📈 Scalability Considerations

1) If this application needs to scale for large traffic:
2) Use Load Balancer (e.g., Nginx)
Horizontal Scaling (multiple backend instances)
3) Convert into Microservices architecture
4) Use Redis for caching frequently accessed tasks
5) Add database indexing
6) Use Docker and Kubernetes for container orchestration

## 🔒 Security Measures

Password hashing using bcrypt
JWT token authentication
Protected routes middleware
Environment variables for secrets
CORS protection

## 👨‍💻 Author

Atharv Dixit
Final Year Computer Engineering Student

## 📄 License

This project is created for educational and assessment purposes.