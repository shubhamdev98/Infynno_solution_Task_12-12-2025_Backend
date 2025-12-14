# Task Manager - Backend API Server

A robust Express.js backend API server built with TypeScript, providing RESTful endpoints for task management and user authentication.

## 🚀 Overview

This is the backend server application built with Express, TypeScript, and Sequelize. It provides secure API endpoints for user authentication and task management with MySQL database integration.

## ✨ Features

- **User Authentication**
  - JWT-based authentication
  - Access and refresh token system
  - Secure password hashing with bcrypt
  - HttpOnly cookies for refresh tokens
  - Automatic token refresh mechanism

- **Task Management**
  - CRUD operations for tasks
  - Task filtering (status, priority)
  - Task sorting (ascending/descending)
  - User-specific task isolation

- **Security**
  - Input validation with Joi
  - Error handling middleware
  - CORS configuration
  - Protected routes with authentication middleware

- **Database**
  - Sequelize ORM
  - MySQL database
  - Automatic database synchronization
  - Model relationships (User-Task)

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Sequelize** - ORM for MySQL
- **MySQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Joi** - Request validation
- **Pino** - Logging
- **Cookie Parser** - Cookie handling

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # Sequelize database setup
│   │   ├── env.ts        # Environment variables
│   │   └── logger.ts     # Pino logger configuration
│   │
│   ├── constant/         # Constants
│   │   ├── general.ts    # General constants (JWT, cookies)
│   │   └── response.ts   # Response helpers
│   │
│   ├── middleware/       # Express middleware
│   │   ├── auth.middleware.ts    # Authentication middleware
│   │   ├── error.middleware.ts   # Error handling
│   │   └── validate.middleware.ts  # Request validation
│   │
│   ├── models/           # Sequelize models
│   │   ├── user.model.ts # User model
│   │   └── task.model.ts # Task model
│   │
│   ├── modules/         # Feature modules
│   │   ├── user/        # User module
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.repository.ts
│   │   │   └── user.types.ts
│   │   └── task/        # Task module
│   │       ├── task.controller.ts
│   │       ├── task.service.ts
│   │       ├── task.repository.ts
│   │       └── task.types.ts
│   │
│   ├── routes/          # API routes
│   │   ├── user.routes.ts
│   │   └── task.routes.ts
│   │
│   ├── utils/           # Utility functions
│   │   ├── ApiError.ts  # Custom error class
│   │   ├── AsyncHandler.ts  # Async error handler
│   │   └── Jwt.ts       # JWT utilities
│   │
│   ├── validators/       # Request validators
│   │   ├── user.validator.ts
│   │   └── task.validator.ts
│   │
│   └── app.ts           # Express app configuration
│
├── index.ts             # Application entry point
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Setup

Create a `.env` file in the `server` directory:

```env
# Database Configuration
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost

# Server Configuration
PORT=3000

# JWT Secrets (use strong, random strings)
JWT_ACCESS_SECRET=your_access_token_secret_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_key_here
```

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE your_database_name;
```

2. The application will automatically sync the database schema on startup.

### Development

```bash
# Start development server with hot reload
pnpm dev
```

The server will start on `http://localhost:3000`

### Production

```bash
# Build TypeScript to JavaScript
pnpm build

# Start production server
pnpm start
```

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/v1/user/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "accessToken": "jwt_token_here"
  }
}
```

#### Login
```
POST /api/v1/user/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "jwt_token_here"
  }
}
```

#### Refresh Token
```
GET /api/v1/user/refresh
Cookies: refreshToken (httpOnly)

Response:
{
  "success": true,
  "message": "Access token refreshed",
  "data": {
    "accessToken": "new_jwt_token_here"
  }
}
```

#### Get Profile
```
GET /api/v1/user/profile
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "user": { ... }
  }
}
```

#### Logout
```
POST /api/v1/user/logout
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "message": "Logged out successfully",
  "data": {}
}
```

### Task Endpoints

#### Get All Tasks
```
GET /api/v1/task
Authorization: Bearer <access_token>
Query Params:
  - status: "pending" | "completed" (optional)
  - priority: "low" | "medium" | "high" (optional)
  - sortOrder: "ASC" | "DESC" (optional, default: "DESC")

Response:
{
  "success": true,
  "message": "Tasks fetched",
  "data": [ ... ]
}
```

#### Create Task
```
POST /api/v1/task
Authorization: Bearer <access_token>
Content-Type: application/json

Body:
{
  "title": "Task title",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-12-31T23:59:59.000Z"
}

Response:
{
  "success": true,
  "message": "Task created",
  "data": { ... }
}
```

#### Update Task
```
PUT /api/v1/task/:id
Authorization: Bearer <access_token>
Content-Type: application/json

Body: (same as create)

Response:
{
  "success": true,
  "message": "Task updated",
  "data": null
}
```

#### Delete Task
```
DELETE /api/v1/task/:id
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "message": "Task deleted",
  "data": null
}
```

## 🔐 Authentication

### Token System

- **Access Token**: 
  - Stored in response body (client stores in localStorage)
  - Expires in 15 minutes
  - Sent in `Authorization: Bearer <token>` header

- **Refresh Token**:
  - Stored in httpOnly cookie
  - Expires in 7 days
  - Used to refresh access tokens

### Protected Routes

All task endpoints require authentication. Include the access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## 🗄️ Database Schema

### Users Table
- `id` (INT, Primary Key, Auto Increment)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `refreshToken` (VARCHAR, Nullable)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

### Tasks Table
- `id` (INT, Primary Key, Auto Increment)
- `title` (VARCHAR)
- `description` (TEXT)
- `status` (ENUM: 'pending', 'completed')
- `priority` (ENUM: 'low', 'medium', 'high')
- `dueDate` (DATETIME)
- `userId` (INT, Foreign Key -> Users.id)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_NAME` | MySQL database name | Yes |
| `DB_USER` | MySQL database user | Yes |
| `DB_PASSWORD` | MySQL database password | Yes |
| `DB_HOST` | MySQL database host | Yes |
| `PORT` | Server port | Yes |
| `JWT_ACCESS_SECRET` | Secret for access tokens | Yes |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | Yes |

### Constants

Token expiration times are configured in `src/constant/general.ts`:
- Access Token: 15 minutes
- Refresh Token: 7 days
- Cookie settings: httpOnly, sameSite: strict

## 🛡️ Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- HttpOnly cookies for refresh tokens
- CORS configuration
- Input validation with Joi
- Error handling middleware
- Protected routes with authentication middleware

## 📝 Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build TypeScript to JavaScript
- `pnpm start` - Start production server

## 🧪 Error Handling

The application uses a centralized error handling middleware:
- Custom `ApiError` class for structured errors
- Consistent error response format
- Proper HTTP status codes

## 📦 Dependencies

### Core Dependencies
- `express` - Web framework
- `sequelize` - ORM
- `mysql2` - MySQL driver
- `jsonwebtoken` - JWT handling
- `bcryptjs` - Password hashing
- `joi` - Validation
- `cookie-parser` - Cookie handling
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `pino` - Logging

### Dev Dependencies
- `typescript` - Type safety
- `ts-node` - TypeScript execution
- `ts-node-dev` - Development with hot reload
- `@types/*` - TypeScript type definitions

## 🔄 Database Synchronization

The application automatically syncs the database schema on startup using Sequelize's `sync({ alter: true })`. This ensures the database schema matches the models.

## 📄 License

ISC

