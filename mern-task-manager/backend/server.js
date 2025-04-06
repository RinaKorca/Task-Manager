const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes"); // ✅ Import auth routes
const taskRoutes = require("./routes/taskRoutes");
const protect = require("./middleware/authMiddleware");

dotenv.config(); // Load .env variables

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Use the auth routes
app.use("/api/users", authRoutes); // Register routes under '/api/users'

// Use the task routes with protection
app.use("/api/tasks", protect, taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
