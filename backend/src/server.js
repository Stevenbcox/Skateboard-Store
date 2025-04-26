const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const skateboardRoutes = require("./routes/skateboardRoutes");
const authenticateToken = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;
const pool = require("./db/pool");

// Middleware
app.use(cors());
app.use(express.json());

console.log("Database URL:", process.env.DATABASE_URL);

// Routes
console.log("Registering /auth routes...");
app.use("/auth", authRoutes);

console.log("Registering /admin routes...");
app.use("/admin", authenticateToken, adminRoutes); // Protect admin routes

console.log("Registering /api/skateboards routes...");
app.use("/api/skateboards", skateboardRoutes);

// Test route for debugging
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Skateboard Store API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
