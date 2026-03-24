# COMP229 Assignment 2 - Full Stack Application

Complete React + Express + MongoDB application with full CRUD functionality for User, Project, Service, and Reference (Contact) management.

## 📚 Documentation

- **[API Integration Guide](API_INTEGRATION.md)** - Complete API setup and testing
- **[Integration Checklist](INTEGRATION_CHECKLIST.md)** - Verification steps and troubleshooting
- **[Frontend README](frontend/README.md)** - React component details

## 🏗️ Architecture

```
COMP229-Assignment2/
├── Backend (Express + MongoDB)
│   ├── Controllers/       # CRUD logic for each entity
│   ├── Models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── config/           # Database and app configuration
│   └── index.js          # Main server file
│
└── Frontend (React)
    ├── components/       # Form and List components for each entity
    ├── pages/           # Page components combining form + list
    ├── services/        # API service layer (axios)
    └── index.css        # Professional styling
```

## 🚀 Quick Start

### Backend Setup
```bash
# 1. Install dependencies
npm install

# 2. Create .env file with MongoDB URI
echo 'MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database' > .env
echo 'PORT=3000' >> .env

# 3. Start server
npm run dev    # Development with auto-reload
npm start      # Production
```

Server runs on: http://localhost:3000

### Frontend Setup
```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start development server
npm start
```

Frontend runs on: http://localhost:3000 (or next available port)

## 📋 Features

### ✅ Complete CRUD Operations

- **Users**: Create, Read, Update, Delete users (firstname, lastname, email, password)
- **Projects**: Create, Read, Update, Delete projects (title, description, completion date)
- **Services**: Create, Read, Update, Delete services (title, description)
- **Contacts**: Create, Read, Update, Delete contacts (firstname, lastname, email, position, company)

### ✅ Frontend Features
- Professional forms with validation
- Responsive data tables
- Delete confirmation dialogs
- Loading states and error messages
- Real-time UI updates
- Edit functionality with pre-filled forms
- Navigation between pages

### ✅ Backend Features
- RESTful API with proper HTTP methods
- MongoDB persistence
- Consistent response formatting
- Global error handling
- CORS enabled for frontend communication

## 🔗 API Endpoints

All endpoints use `/api/` prefix and listen on port 3000.

### Authentication & Structure
Every response includes: `{ success: boolean, message: string, data: object }`

### Users (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `POST /` - Create user
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

### Projects (`/api/projects`)
- `GET /` - Get all projects
- `GET /:id` - Get project by ID
- `POST /` - Create project
- `PUT /:id` - Update project
- `DELETE /:id` - Delete project

### Services (`/api/services`)
- `GET /` - Get all services
- `GET /:id` - Get service by ID
- `POST /` - Create service
- `PUT /:id` - Update service
- `DELETE /:id` - Delete service

### References (`/api/references`)
- `GET /` - Get all references
- `GET /:id` - Get reference by ID
- `POST /` - Create reference
- `PUT /:id` - Update reference
- `DELETE /:id` - Delete reference

## 🛠️ Tech Stack

### Backend
- Express.js (Web framework)
- MongoDB (Database)
- Mongoose (ODM)
- CORS (Cross-origin requests)
- Morgan (HTTP logging)
- Nodemon (Auto-reload)

### Frontend
- React 18 (UI)
- React Router (Navigation)
- Axios (HTTP client)
- React Hooks (useReducer, useState, useEffect)

## 💾 State Management

### Frontend
- **useReducer** - Form state (add/edit)
- **useState** - UI state (loading, errors, list, editing)
- **useEffect** - Data fetching on mount

### Data Flow
1. User fills form → saved in useReducer state
2. User submits → API call to backend
3. Backend stores in MongoDB → returns response
4. Frontend updates state/list → UI re-renders
5. User refreshes → data fetched from database

## ✅ Testing the Integration

### Prerequisites
1. MongoDB running and configured in `.env`
2. Node.js installed

### Test Steps

**1. Start Backend**
```bash
npm run dev
# Should see: 🚀 Server running on http://localhost:3000
```

**2. Start Frontend**
```bash
cd frontend
npm start
# Browser opens to React app
```

**3. Create Test Data**
- Add 2+ users through the form
- Add 1+ project
- Add 1+ service
- Add 1+ contact

**4. Verify Data**
- Check Network tab shows 201/200 responses
- Check Database has new records
- Refresh page - data persists

**5. Test Each Operation**
- ✅ CREATE: Use forms to add data
- ✅ READ: Page loads existing data
- ✅ UPDATE: Click Edit and modify
- ✅ DELETE: Click Delete and confirm

## 📊 Database Schema

### User
```
{
  firstname: String
  lastname: String
  email: String
  password: String
  created: Date
  updated: Date
}
```

### Project
```
{
  title: String
  description: String
  completion: Date
}
```

### Service
```
{
  title: String
  description: String
}
```

### Reference
```
{
  firstname: String
  lastname: String
  email: String
  position: String
  company: String
}
```

## 🐛 Troubleshooting

### Backend Won't Start
- Check MongoDB URI in `.env` is correct
- Verify MongoDB is running
- Check port 3000 is available: `lsof -i :3000` or `netstat -ano | findstr :3000`

### Frontend Can't Connect to Backend
- Ensure backend is running first
- Check `http://localhost:3000/api/users` loads in browser (should show JSON)
- Check Network tab for CORS errors

### CRUD Operations Fail
- Check Network tab for response status (200/201 or error)
- Check backend terminal for error logs
- Verify database connection: `db.users.find()` in MongoDB

### Data Doesn't Persist After Refresh
- Verify MongoDB is storing records
- Check `.env` MongoDB URI is correct
- Restart backend if connection dropped

See **[INTEGRATION_CHECKLIST.md](INTEGRATION_CHECKLIST.md)** for detailed troubleshooting.

## 📝 Project Structure

```
COMP229-Assignment2/
├── index.js                          # Server entry point
├── package.json                      # Backend dependencies
├── .env                              # Environment config (NOT in git)
├── README.md                         # This file
├── API_INTEGRATION.md                # API documentation
├── INTEGRATION_CHECKLIST.md          # Testing guide
│
├── config/
│   ├── DB.js                        # Database setup
│   ├── express.js                   # Express config
│   └── mongoDB.js                   # MongoDB connection
│
├── Backend/
│   ├── Controllers/
│   │   ├── user.controller.js       # User CRUD (Create, Read, Update, Delete)
│   │   ├── project.controller.js    # Project CRUD
│   │   ├── service.controller.js    # Service CRUD
│   │   └── reference.controller.js  # Reference CRUD
│   │
│   ├── Models/
│   │   ├── user.model.js
│   │   ├── project.model.js
│   │   ├── service.model.js
│   │   └── reference.model.js
│   │
│   └── routes/
│       ├── user.routes.js
│       ├── project.routes.js
│       ├── service.routes.js
│       └── reference.routes.js
│
└── frontend/
    ├── public/index.html             # HTML entry point
    ├── src/
    │   ├── components/
    │   │   ├── UserComponents.js     # User Form & List
    │   │   ├── ProjectComponents.js  # Project Form & List
    │   │   ├── ServiceComponents.js  # Service Form & List
    │   │   └── ReferenceComponents.js# Contact Form & List
    │   │
    │   ├── pages/
    │   │   ├── UsersPage.js          # User management page
    │   │   ├── ProjectsPage.js       # Project management page
    │   │   ├── ServicesPage.js       # Service management page
    │   │   └── ReferencesPage.js     # Contact management page
    │   │
    │   ├── services/
    │   │   └── api.js                # API client (Axios)
    │   │
    │   ├── App.js                    # Main app component
    │   ├── index.js                  # React entry
    │   └── index.css                 # Global styles
    │
    ├── package.json                  # Frontend dependencies
    └── README.md                     # Frontend docs
```

## 🔐 Security Note

⚠️ This is a development/learning project. For production:
- Use bcryptjs for password hashing
- Implement JWT authentication
- Add input validation
- Use HTTPS
- Implement rate limiting
- Add proper error logging

## 📄 License

COMP229 Assignment (Educational Use)

---

**Status**: ✅ Complete - Full Stack CRUD Application with API Integration
**Last Updated**: March 2026
