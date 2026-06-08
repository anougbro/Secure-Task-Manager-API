# API Examples - Task Manager

Complete examples for testing all API endpoints.

## 🔑 Authentication

### 1. Sign Up

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

**Response (201):**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "isGoogleUser": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### 2. Login

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

**Response (200):**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 3. Google OAuth

**Request:**
```
https://localhost:5000/api/auth/google
```

Redirects to Google login, then to callback which creates/logs in user.

### 4. Get Current User

**Request:**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": null,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### 5. Logout

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

## ✅ Tasks Management

### 1. Create Task

**Request:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, cheese",
    "priority": "high",
    "dueDate": "2024-12-25"
  }'
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "task": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread, cheese",
      "completed": false,
      "priority": "high",
      "dueDate": "2024-12-25T00:00:00Z",
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### 2. Get All Tasks

**Request (No filters):**
```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Request (With filters):**
```bash
# Get only active tasks
curl "http://localhost:5000/api/tasks?completed=false" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get only completed tasks
curl "http://localhost:5000/api/tasks?completed=true" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get high priority tasks
curl "http://localhost:5000/api/tasks?priority=high" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Sort by due date
curl "http://localhost:5000/api/tasks?sortBy=dueDate" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Combine filters
curl "http://localhost:5000/api/tasks?completed=false&priority=high&sortBy=dueDate" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200):**
```json
{
  "status": "success",
  "results": 2,
  "data": {
    "tasks": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread, cheese",
        "completed": false,
        "priority": "high",
        "dueDate": "2024-12-25T00:00:00Z",
        "userId": "507f1f77bcf86cd799439011",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      {
        "_id": "507f1f77bcf86cd799439013",
        "title": "Complete project",
        "description": "Finish the report",
        "completed": false,
        "priority": "medium",
        "dueDate": "2024-12-20T00:00:00Z",
        "userId": "507f1f77bcf86cd799439011",
        "createdAt": "2024-01-14T09:15:00Z",
        "updatedAt": "2024-01-14T09:15:00Z"
      }
    ]
  }
}
```

### 3. Get Single Task

**Request:**
```bash
curl http://localhost:5000/api/tasks/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "task": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread, cheese",
      "completed": false,
      "priority": "high",
      "dueDate": "2024-12-25T00:00:00Z",
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### 4. Update Task

**Request (Update title):**
```bash
curl -X PATCH http://localhost:5000/api/tasks/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and cook dinner"
  }'
```

**Request (Mark as completed):**
```bash
curl -X PATCH http://localhost:5000/api/tasks/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

**Request (Update multiple fields):**
```bash
curl -X PATCH http://localhost:5000/api/tasks/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Updated list",
    "priority": "medium",
    "completed": true,
    "dueDate": "2024-12-26"
  }'
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "task": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Buy groceries",
      "description": "Updated list",
      "completed": true,
      "priority": "medium",
      "dueDate": "2024-12-26T00:00:00Z",
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T11:45:00Z"
    }
  }
}
```

### 5. Delete Task

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (204):**
```
No content
```

### 6. Delete All Completed Tasks

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/completed/all \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Deleted 3 completed tasks",
  "deletedCount": 3
}
```

---

## ❌ Error Responses

### 401 - Unauthorized (No Token)

**Request:**
```bash
curl http://localhost:5000/api/tasks
```

**Response:**
```json
{
  "status": "error",
  "message": "You are not logged in. Please login to access this resource."
}
```

### 401 - Invalid Token

**Request:**
```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer invalid_token_123"
```

**Response:**
```json
{
  "status": "error",
  "message": "Invalid or expired token. Please login again."
}
```

### 400 - Validation Error (Signup)

**Request (Passwords don't match):**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "different123"
  }'
```

**Response:**
```json
{
  "status": "error",
  "message": "Passwords do not match"
}
```

### 400 - Validation Error (Missing field)

**Request:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "No title provided"
  }'
```

**Response:**
```json
{
  "status": "error",
  "message": "Please provide a task title"
}
```

### 403 - Forbidden (Wrong owner)

**Request (Trying to delete someone else's task):**
```bash
curl -X DELETE http://localhost:5000/api/tasks/OTHER_USER_TASK_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "status": "error",
  "message": "You do not have permission to delete this task"
}
```

### 404 - Not Found

**Request:**
```bash
curl http://localhost:5000/api/tasks/invalid_id \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "status": "error",
  "message": "Task not found"
}
```

---

## 🧪 Testing with Postman

1. **Create environment variables:**
   - `baseUrl` = `http://localhost:5000`
   - `token` = (paste JWT after login)

2. **Pre-request Script** (auto-set header):
   ```javascript
   pm.request.headers.add({
     key: "Authorization",
     value: "Bearer " + pm.environment.get("token")
   });
   ```

3. **Test with Scripts:**
   ```javascript
   // Save token after login
   var jsonData = pm.response.json();
   pm.environment.set("token", jsonData.token);
   ```

---

## 💡 Tips

- Always include `Authorization: Bearer <TOKEN>` in protected routes
- Use `-c cookies.txt` to save cookies with login
- Use `-b cookies.txt` to include saved cookies in requests
- Query parameters are case-sensitive: `?completed=true` (not `True`)
- ISO date format for due dates: `2024-12-25T00:00:00Z`

---

**Happy testing! 🚀**
