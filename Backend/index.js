
require("dotenv").config();

const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
console.log("MONGO_URI =", process.env.MONGO_URI);
const connectDB = require("./config/mongoDB.js");
//let app = require('./config/express.js');

const referenceRoutes = require("./routes/reference.routes.js");
const projectRoutes = require("./routes/project.routes.js");
const serviceRoutes = require("./routes/service.routes.js");
const userRoutes = require("./routes/user.routes.js");

const dns = require('node:dns/promises'); dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();

// Connect Database (ONLY ONCE)
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/references", referenceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the COMP229 Assignment 2 API',
    apis: {
      references: {
        "GET /api/references": "Retrieve all references",
        "GET /api/references/:id": "Retrieve a specific reference by ID",
        "POST /api/references": "Create a new reference",
        "PUT /api/references/:id": "Update an existing reference by ID"
      },
      projects: {
        "GET /api/projects": "Retrieve all projects",
        "GET /api/projects/:id": "Retrieve a specific project by ID",
        "POST /api/projects": "Create a new project",
        "PUT /api/projects/:id": "Update an existing project by ID"
      },
      services: {
        "GET /api/services": "Retrieve all services",
        "GET /api/services/:id": "Retrieve a specific service by ID",
        "POST /api/services": "Create a new service",
        "PUT /api/services/:id": "Update an existing service by ID"
      },
      users: {
        "GET /api/users": "Retrieve all users",
        "GET /api/users/:id": "Retrieve a specific user by ID",
        "POST /api/users": "Create a new user",
        "PUT /api/users/:id": "Update an existing user by ID"
      }
    }
  });
});


// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Endpoint not found"));
});

// Global Error Handler (LAST)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});