# API Integration Guide

## Backend Setup

The backend Express server runs on **http://localhost:3000** and provides RESTful API endpoints for all CRUD operations.

### Start Backend Server

```bash
cd .
npm install
npm run dev  # or npm start for production
```

The server will connect to MongoDB and display:
```
🚀 Server running on http://localhost:3000
```

## Frontend Setup

The React frontend connects to the backend API automatically via the configured base URL.

### Start Frontend Server

```bash
cd frontend
npm install
npm start
```

The frontend will open at **http://localhost:3000** (or another available port).

## API Endpoints

All endpoints are prefixed with `/api/`:

### Users API
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**Fields:** `firstname`, `lastname`, `email`, `password`

### Projects API
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Fields:** `title`, `description`, `completion` (date)

### Services API
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

**Fields:** `title`, `description`

### References (References) API
- `GET /api/references` - Get all references
- `GET /api/references/:id` - Get reference by ID
- `POST /api/references` - Create new reference
- `PUT /api/references/:id` - Update reference
- `DELETE /api/references/:id` - Delete reference

**Fields:** `firstname`, `lastname`, `email`, `position`, `company`

## API Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Returned data here
  }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Frontend API Integration

### API Service (`src/services/api.js`)

The frontend has a centralized API service that:
- Manages the axios instance with automatic CORS handling
- Uses the correct base URL (`http://localhost:3000`)
- Includes a response interceptor that flattens the data structure
- Provides standardized methods for each entity type

### Response Interceptor

The response interceptor automatically transforms the backend response:

```javascript
// Backend returns:
{ success: true, data: [...] }

// Frontend receives:
{ data: [...] }
```

This allows frontend components to seamlessly access `response.data` without worrying about the wrapper structure.

### Usage Example

```javascript
import { userAPI } from '../services/api';

// Fetch all users
const response = await userAPI.getAll();
const users = response.data;  // Already extracted from backend response

// Create user
await userAPI.create({ firstname: 'John', lastname: 'Doe', email: '...', password: '...' });

// Update user
await userAPI.update(userId, { firstname: 'Jane' });

// Delete user
await userAPI.delete(userId);
```

## Frontend Components

Each page follows this pattern:

1. **Form Component** - Uses `useReducer` for state management
   - Handles add and edit functionality
   - Validates form inputs
   - Sends data to backend via API

2. **List Component** - Uses `useState` for state management
   - Displays all records in a table
   - Shows edit and delete buttons
   - Handles loading and error states

3. **Page Component** - Orchestrates form and list
   - Fetches data from backend on mount
   - Manages which item is being edited
   - Updates UI after CRUD operations

### State Management Pattern

**useReducer for forms:**
```javascript
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
```

**useState for UI:**
```javascript
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(false);
const [editingItem, setEditingItem] = useState(null);
```

## Error Handling

### Backend Errors

The backend returns appropriate HTTP status codes:
- `201` - Created successfully
- `400` - Bad request
- `404` - Not found
- `500` - Server error

### Frontend Error Handling

Each API call includes try-catch blocks:

```javascript
try {
  const response = await api.get('/endpoint');
  // Handle success
} catch (err) {
  const message = err.response?.data?.message || 'Error occurred';
  setError(message);
}
```

Components display errors to users in red error boxes.

## Testing the Integration

### Test User Creation
1. Fill out the User form with:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123
2. Click "Add User"
3. Verify the user appears in the Users List table
4. Check MongoDB to confirm the record was saved

### Test User Update
1. Click "Edit" on any user in the list
2. Modify any field
3. Click "Update User"
4. Verify changes appear in the table

### Test User Delete
1. Click "Delete" on any user
2. Confirm in the dialog box
3. Verify the user is removed from the table

### Test Data Persistence
1. Create several records
2. Refresh the page
3. Verify all records still appear (data is persisted in MongoDB)

## Debugging

### Check Backend Connection
Open browser DevTools (F12) → Network tab and make requests:
- You should see requests to `http://localhost:3000/api/*`
- Responses should have status 200 (success) or 201 (created)

### Check MongoDB
Verify data is being stored:
```javascript
// In MongoDB compass or CLI
db.users.find()
db.projects.find()
db.services.find()
db.references.find()
```

### Check Console Errors
- Backend: Look for errors in the terminal where `npm run dev` is running
- Frontend: Open browser DevTools → Console tab for JavaScript errors

## Troubleshooting

### "CORS error" or "Connection refused"
- Make sure backend is running (`npm run dev` in root directory)
- Check backend is on port 3000
- Check frontend api.js has correct BASE_URL

### "Cannot POST /api/users" (404 error)
- Check routes are registered in index.js
- Verify Controllers folder path is correct (case-sensitive: "Controllers" not "controllers")
- Restart backend server after making changes

### Data not persisting
- Check MongoDB connection: `console.log("MONGO_URI =", process.env.MONGO_URI);` should show a valid URI
- Verify .env file has correct MONGO_URI
- Check error logs in backend terminal

### Form submits but data doesn't appear in list
- Check Network tab for successful API call (201 or 200 status)
- Verify useReducer is properly resetting form after submission
- Check list is being refetched with `fetchUsers()` after save

## Environment Variables

Backend requires `.env` file with:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3000
```

Frontend api.js is hardcoded to `http://localhost:3000`. Update if needed.
