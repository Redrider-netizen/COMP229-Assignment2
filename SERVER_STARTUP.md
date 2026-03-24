# Server Startup Guide

## Current Status ✅

- **Backend Server**: Fully configured and ready to run on `http://localhost:3000`
- **Frontend App**: Configured to connect to backend at `http://localhost:3000`
- **MongoDB**: Connected and ready (using cluster credentials in `.env`)

## The 404 Error Issue

The `GET http://localhost:3000/api/references 404` error occurs because:
1. The **frontend tries to fetch data immediately on page load**
2. If the **backend server isn't running yet**, the request fails with 404
3. Or if the **frontend runs BEFORE backend starts**, the API isn't available

## Solution: Start Servers in Correct Order

### Step 1: Start Backend Server (Terminal 1)

```bash
cd c:\Users\Owner\Documents\GitHub\COMP229-Assignment2
npm run dev
```

**Expected Output:**
```
[dotenv@17.3.1] injecting env...
MONGO_URI = mongodb+srv://portfolioUser:...
🚀 Server running on http://localhost:3000
✅ MongoDB connected successfully
```

⏳ **Wait for "MongoDB connected successfully" before starting frontend!**

### Step 2: Start Frontend Server (Terminal 2 - NEW TERMINAL)

Once backend shows "MongoDB connected", open a **NEW terminal** and run:

```bash
cd c:\Users\Owner\Documents\GitHub\COMP229-Assignment2\frontend
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view assignment-frontend in the browser.

  Local:            http://localhost:3000   (if available)
  or                http://localhost:3001   (if 3000 is taken)
  On Your Network:  http://192.168.x.x:xxxx
```

### Step 3: Test in Browser

1. Navigate to the URL shown (http://localhost:3000 or http://localhost:3001)
2. The app should load WITHOUT any 404 errors
3. You can now create, read, update, and delete data

---

## Troubleshooting

### Still Getting 404 Errors?

**Problem**: Frontend running on port 3001 but still getting 404

**Solution**: The frontend needs to use the correct backend URL. Update [frontend/src/services/api.js](../frontend/src/services/api.js):

```javascript
// For backend on 3000 (default)
const BASE_URL = 'http://localhost:3000';

// If backend is on different port:
// const BASE_URL = 'http://localhost:5000';
```

### Ports Already in Use?

**Problem**: Port 3000 already in use

**Solution**: 
- Option 1: Stop other processes using port 3000
- Option 2: Change backend PORT in `.env` file:
  ```
  MONGO_URI=mongodb+srv://...
  PORT=5000
  ```
  Then update frontend API URL to match.

### Backend Won't Connect to MongoDB?

**Problem**: MongoDB connection fails

**Solution**:
1. Verify MongoDB cluster is running
2. Check `.env` MONGO_URI is correct:
   ```
   MONGO_URI=mongodb+srv://portfolioUser:StrongPassword123@cluster0.ek7cqla.mongodb.net/?appName=Cluster0
   ```
3. Verify internet connection can reach MongoDB cloud
4. Check MongoDB username/password are correct

### Frontend Shows Blank Page?

**Problem**: Frontend loads but no data displays

**Solution**:
1. Open DevTools (F12) → Console tab
2. Check for errors related to API calls
3. Verify backend is running: curl http://localhost:3000/api/users
4. Check Network tab to see API requests and responses

---

## Complete Workflow

### Terminal 1 (Backend)
```bash
cd c:\Users\Owner\Documents\GitHub\COMP229-Assignment2
npm run dev
# Wait for: "🚀 Server running on http://localhost:3000"
# Wait for: "✅ MongoDB connected successfully"
```

### Terminal 2 (Frontend) - Open AFTER backend is ready
```bash
cd c:\Users\Owner\Documents\GitHub\COMP229-Assignment2\frontend
npm start
# Opens browser automatically to http://localhost:3000 (or 3001)
```

### Browser
1. App loads at http://localhost:3000 (frontend) or http://localhost:3001
2. No 404 errors in Network tab
3. Data loads in all tables
4. CRUD operations work

---

## Testing the Connection

### From Command Line (with backend running):

```powershell
# Test if backend is responding
Invoke-WebRequest -Uri http://localhost:3000/api/users

# Should return JSON with users data
```

### From Browser Console (in frontend):

```javascript
// Open DevTools → Console
fetch('http://localhost:3000/api/references')
  .then(r => r.json())
  .then(data => console.log(data))
```

Should log:
```javascript
{
  success: true,
  message: "References list retrieved successfully.",
  data: [ /* array of references */ ]
}
```

---

## File Structure Verification

```
COMP229-Assignment2/
├── .env                          ✅ Has MONGO_URI
├── index.js                      ✅ Server entry point
├── config/
│   └── mongoDB.js                ✅ MongoDB connection
├── Backend/
│   ├── Controllers/              ✅ CRUD logic
│   ├── Models/                   ✅ Database schemas
│   └── routes/                   ✅ Backend routes
├── routes/                       ✅ Root-level routes (load in index.js)
│   ├── user.routes.js
│   ├── project.routes.js
│   ├── service.routes.js
│   └── reference.routes.js
└── frontend/
    ├── src/
    │   ├── services/api.js       ✅ Points to http://localhost:3000
    │   └── ...
    └── package.json              ✅ Has react-scripts
```

---

## Next Steps

Once both servers are running and 404 errors are gone:

1. ✅ Test **CREATE**: Add new user/project/service/contact
2. ✅ Test **READ**: Refresh page - data persists
3. ✅ Test **UPDATE**: Edit a record
4. ✅ Test **DELETE**: Remove a record
5. ✅ Check MongoDB - verify data is stored

---

**All systems configured and ready!** 🚀
