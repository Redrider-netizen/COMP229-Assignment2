
require("dotenv").config();

const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
console.log("MONGO_URI =", process.env.MONGO_URI);
const connectDB = require("./config/DB.js");

const referenceRoutes = require("./routes/reference.routes.js");
const projectRoutes = require("./routes/project.routes.js");
const serviceRoutes = require("./routes/service.routes.js");
const userRoutes = require("./routes/user.routes.js");

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});