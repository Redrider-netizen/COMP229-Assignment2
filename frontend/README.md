# COMP229 Assignment - React Frontend

A comprehensive React frontend for managing Users, Projects, Services, and Contacts with forms, list pages, and state management.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── UserComponents.js      # User form and list components
│   │   ├── ProjectComponents.js   # Project form and list components
│   │   ├── ServiceComponents.js   # Service form and list components
│   │   └── ReferenceComponents.js # Contact form and list components
│   ├── pages/
│   │   ├── UsersPage.js           # Users page with full CRUD
│   │   ├── ProjectsPage.js        # Projects page with full CRUD
│   │   ├── ServicesPage.js        # Services page with full CRUD
│   │   └── ReferencesPage.js      # Contacts page with full CRUD
│   ├── services/
│   │   └── api.js                 # API utility functions for backend communication
│   ├── App.js                     # Main app component with routing
│   ├── index.js                   # Entry point
│   └── index.css                  # Global styles
└── package.json
```

## Features

### State Management
- **useReducer**: Used for form state management (add/edit forms)
- **useState**: Used for list state, loading states, and error handling
- Efficient form reset and field updates using dispatcher actions

### Components

#### UserComponents
- `UserForm`: Form for adding and editing users
  - Fields: First Name, Last Name, Email, Password
  - Uses useReducer for form state
- `UserList`: Display all users in a table with edit/delete buttons
  - Includes delete confirmation
  - Real-time list updates

#### ProjectComponents
- `ProjectForm`: Form for adding and editing projects
  - Fields: Title, Description, Completion Date
  - Uses useReducer for form state
- `ProjectList`: Display all projects in a table with edit/delete buttons

#### ServiceComponents
- `ServiceForm`: Form for adding and editing services
  - Fields: Title, Description
  - Uses useReducer for form state
- `ServiceList`: Display all services in a table with edit/delete buttons

#### ReferenceComponents (Contacts)
- `ReferenceForm`: Form for adding and editing contacts
  - Fields: First Name, Last Name, Email, Position, Company
  - Uses useReducer for form state
- `ReferenceList`: Display all contacts in a table with edit/delete buttons

### Pages

Each page combines a form and list component:
- **UsersPage**: Full user management interface
- **ProjectsPage**: Full project management interface
- **ServicesPage**: Full service management interface
- **ReferencesPage**: Full contact management interface

### API Integration

The `api.js` service provides standardized endpoints for all entities:
- `getAll()`: Fetch all records
- `getById(id)`: Fetch single record
- `create(data)`: Create new record
- `update(id, data)`: Update existing record
- `delete(id)`: Delete record

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`.

## Configuration

Update the `BASE_URL` in `src/services/api.js` to match your backend server URL:

```javascript
const BASE_URL = 'http://localhost:5000'; 
```

## API Endpoints Expected

The backend should provide these endpoints:

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Projects
- `GET /projects` - List all projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Services
- `GET /services` - List all services
- `GET /services/:id` - Get service by ID
- `POST /services` - Create service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service

### References (Contacts)
- `GET /references` - List all references
- `GET /references/:id` - Get reference by ID
- `POST /references` - Create reference
- `PUT /references/:id` - Update reference
- `DELETE /references/:id` - Delete reference

## State Management Details

### useReducer Pattern
The form components use a reducer pattern for predictable state management:

```javascript
const initialFormState = {
  field1: '',
  field2: '',
  ...
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialFormState;
    case 'SET_DATA':
      return action.payload;
    default:
      return state;
  }
};
```

This ensures:
- Predictable state updates
- Easy form reset after submission
- Clear separation of concerns
- Easy-to-debug state changes

### useState Pattern
Used for:
- Modal/form visibility states
- Loading states during API calls
- Error messages
- Currently editing item tracking
- List data state

## Styling

The application includes comprehensive CSS styling with:
- Responsive form layouts
- Professional table styling
- Color-coded buttons (primary, secondary, danger, edit)
- Loading and error states
- Hover effects and transitions
- Mobile-friendly navigation

## Future Enhancements

- Add pagination for large data sets
- Add search/filter functionality
- Add toast notifications for user feedback
- Add form validation with error messages
- Add authentication/authorization
- Add bulk operations (delete multiple)
- Add export to CSV functionality
