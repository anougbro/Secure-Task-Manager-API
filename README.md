# Task Manager - REST API with JWT & OAuth

A full-stack task management application with secure authentication, built with Node.js/Express backend and React frontend.

## 🎯 Features

### Authentication & Security
- ✅ JWT-based authentication with HTTP-only cookies
- ✅ Google OAuth 2.0 integration with Passport.js
- ✅ Password hashing with bcrypt
- ✅ Input sanitization (XSS protection, NoSQL injection prevention)
- ✅ Rate limiting on authentication routes
- ✅ Security headers with Helmet.js
- ✅ CORS configuration

### Task Management
- ✅ Create, read, update, delete (CRUD) tasks
- ✅ Task filtering (completed, active)
- ✅ Priority levels (low, medium, high)
- ✅ Due dates for tasks
- ✅ Ownership-based access control
- ✅ Bulk delete completed tasks

### Error Handling
- ✅ Custom AppError class
- ✅ Centralized error handling middleware
- ✅ Async error wrapping with catchAsync utility
- ✅ Comprehensive error messages
- ✅ Development vs production error handling

## 📋 Project Structure

```
task-manager-api/
├── server/                          # Backend (Express.js)
│   ├── config/                      # Configuration files
│   ├── controllers/                 # Route controllers
│   │   ├── authController.js        # Auth logic (signup, login, OAuth)
│   │   └── taskController.js        # Task CRUD operations
│   ├── middleware/                  # Custom middleware
│   │   ├── auth.js                  # JWT verification
│   │   └── errorHandler.js          # Error handling
│   ├── models/                      # MongoDB models
│   │   ├── User.js                  # User schema
│   │   └── Task.js                  # Task schema
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js            # Authentication endpoints
│   │   └── taskRoutes.js            # Task endpoints
│   ├── utils/                       # Utility functions
│   │   ├── AppError.js              # Custom error class
│   │   └── catchAsync.js            # Async error wrapper
│   ├── .env.example                 # Environment template
│   ├── server.js                    # Main server file
│   └── package.json                 # Dependencies
│
└── client/                          # Frontend (React)
    ├── public/                      # Static assets
    │   └── index.html               # HTML template
    ├── src/
    │   ├── components/              # React components
    │   │   ├── TaskForm.jsx         # Task creation form
    │   │   ├── TaskList.jsx         # Task list display
    │   │   └── TaskItem.jsx         # Individual task card
    │   ├── pages/                   # Page components
    │   │   ├── Login.jsx            # Login page
    │   │   ├── Signup.jsx           # Signup page
    │   │   └── Dashboard.jsx        # Main dashboard
    │   ├── services/                # API services
    │   │   └── api.js               # Axios API client
    │   ├── styles/                  # CSS files
    │   │   ├── App.css              # Global styles
    │   │   ├── auth.css             # Auth pages styles
    │   │   ├── dashboard.css        # Dashboard styles
    │   │   ├── taskForm.css         # Task form styles
    │   │   ├── taskList.css         # Task list styles
    │   │   └── taskItem.css         # Task item styles
    ├── App.jsx                      # Root app component
    ├── index.js                     # React entry point
    └── package.json                 # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   JWT_COOKIE_EXPIRE=7
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:5000

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React app:**
   ```bash
   npm start
   ```
   App will open on http://localhost:3000

## 📚 API Documentation

### Authentication Endpoints

**Sign Up**
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Google OAuth**
```
GET /api/auth/google
Redirects to Google login
```

**Get Current User**
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Logout**
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Task Endpoints

**Create Task**
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium",
  "dueDate": "2024-12-31"
}
```

**Get All Tasks**
```http
GET /api/tasks
Authorization: Bearer <token>

Query Parameters:
- completed: true/false
- priority: low/medium/high
- sortBy: createdAt/dueDate/priority
```

**Get Single Task**
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

**Update Task**
```http
PATCH /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New title",
  "completed": true,
  "priority": "high"
}
```

**Delete Task**
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

**Delete All Completed Tasks**
```http
DELETE /api/tasks/completed/all
Authorization: Bearer <token>
```

## 🔐 Security Features

### Authentication
- JWT tokens stored in HTTP-only cookies
- Password hashing with bcrypt
- Token expiration handling
- Refresh token support (can be added)

### Authorization
- Protected routes require valid JWT
- Task ownership verification
- Users can only access/modify their own tasks

### Input Security
- XSS protection with xss-clean
- NoSQL injection prevention with express-mongo-sanitize
- Input validation on all endpoints
- Rate limiting on auth routes

### HTTP Security
- Helmet.js for security headers
- CORS configuration
- Content Security Policy
- XSS prevention headers

## 🛡️ Error Handling

All errors follow a consistent format:

```json
{
  "status": "error",
  "message": "Error description",
  "statusCode": 400
}
```

Common Status Codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## 🧪 Testing the API

### Using cURL

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }' -c cookies.txt

# Create Task (using saved token)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test task",
    "priority": "high"
  }'
```

### Using Postman
1. Import the API endpoints
2. Set up environment variables for baseUrl and token
3. Use pre-request scripts to set auth headers
4. Test each endpoint

## 📱 React Frontend Features

### Pages
- **Login/Signup** - Authentication pages with email/password and Google OAuth
- **Dashboard** - Main page with task list, filters, and sorting

### Components
- **TaskForm** - Create new tasks with validation
- **TaskList** - Display filtered/sorted tasks
- **TaskItem** - Individual task with edit/delete actions

### Functionality
- Real-time task filtering (all, active, completed)
- Sort tasks by creation date, due date, or priority
- Edit tasks inline
- Mark tasks as complete
- Delete individual or completed tasks
- Responsive design (mobile, tablet, desktop)

## 🔄 Request/Response Flow

1. User signs up/logs in
2. Backend generates JWT token
3. Token stored in HTTP-only cookie
4. React app stores token in localStorage (for manual requests)
5. Subsequent requests include token in Authorization header
6. Middleware verifies token
7. Controller processes request if authorized
8. Response returned with consistent format

## 🚨 Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
Solution: Ensure MongoDB is running (mongod command)
```

### CORS Error
```
Solution: Check FRONTEND_URL in .env matches React app URL
```

### Token Expired
```
Solution: Clear cookies and login again
```

### Google OAuth Not Working
```
Solution: 
1. Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
2. Check GOOGLE_CALLBACK_URL matches in Google Console
3. Add localhost:5000 to authorized origins
```

## 📦 Dependencies

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT generation/verification
- **passport** - Authentication middleware
- **helmet** - Security headers
- **bcryptjs** - Password hashing
- **express-rate-limit** - Rate limiting
- **xss-clean** - XSS protection
- **express-mongo-sanitize** - NoSQL injection prevention

### Frontend
- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client

## 🎓 Learning Outcomes

This project teaches:
- ✅ JWT authentication implementation
- ✅ OAuth 2.0 integration with Google
- ✅ Secure password handling
- ✅ Input validation and sanitization
- ✅ Error handling best practices
- ✅ Access control implementation
- ✅ Security middleware configuration
- ✅ MongoDB schema design
- ✅ React hooks and state management
- ✅ API integration with Axios

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork and submit pull requests with improvements!

---

**Built with ❤️ for secure web applications**
#   S e c u r e - T a s k - M a n a g e r - A P I  
 