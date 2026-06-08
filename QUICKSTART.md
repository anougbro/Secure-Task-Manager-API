# QUICKSTART - Task Manager API

Get up and running in 5 minutes!

## ⚡ Setup (Backend + Frontend)

### 1️⃣ Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and update:
```env
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=change_this_to_random_string
PORT=5000
```

Start MongoDB:
```bash
mongod
```

Start server:
```bash
npm run dev
```
✓ Server running on http://localhost:5000

### 2️⃣ Frontend Setup

Open **new terminal window**:

```bash
cd client
npm install
npm start
```

✓ App opens on http://localhost:3000

## 🔑 Test with Demo Account

**Email:** `test@example.com`
**Password:** `password123`

Or create a new account using the Signup page!

## 📚 API Endpoints

```bash
# Signup
POST /api/auth/signup

# Login
POST /api/auth/login

# Get Tasks
GET /api/tasks

# Create Task
POST /api/tasks

# Update Task
PATCH /api/tasks/:id

# Delete Task
DELETE /api/tasks/:id
```

## 🔐 Features You Can Test

✅ Sign up with email & password
✅ Login & get JWT token
✅ Create tasks with priority & due date
✅ Edit tasks
✅ Mark tasks as complete
✅ Delete tasks
✅ Filter & sort tasks
✅ Logout securely

## 🚀 For Production

### Backend

```bash
# Build for production
NODE_ENV=production npm start

# Update .env
NODE_ENV=production
JWT_SECRET=very_long_secure_random_string
MONGODB_URI=your_mongodb_cloud_uri
```

### Frontend

```bash
npm run build
# Deploy the build/ folder to hosting
```

## 📝 Next Steps

1. Read `README.md` for detailed documentation
2. Check `API-EXAMPLES.md` for API usage examples
3. Explore the code to understand the architecture
4. Add Google OAuth (get credentials from Google Cloud Console)
5. Deploy to cloud (Heroku, Vercel, etc.)

## ✅ Checklist

- [ ] MongoDB running
- [ ] Backend server running (port 5000)
- [ ] Frontend app running (port 3000)
- [ ] Can create account
- [ ] Can create task
- [ ] Can edit task
- [ ] Can delete task

## 🆘 Troubleshooting

**Port already in use?**
```bash
# Change PORT in .env
PORT=5001
```

**MongoDB connection error?**
```bash
# Check MongoDB is running
# Or use cloud MongoDB (MongoDB Atlas)
```

**CORS errors?**
```bash
# Update FRONTEND_URL in server/.env
FRONTEND_URL=http://localhost:3000
```

---

**Happy coding! 🎉**
