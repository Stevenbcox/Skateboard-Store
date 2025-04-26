const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const skateboardRoutes = require("./routes/skateboardRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// const corsOptions = {
//   origin: process.env.CLIENT_URL || "*", // Replace with your frontend's URL in production
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
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