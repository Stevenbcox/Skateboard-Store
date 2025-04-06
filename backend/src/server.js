const express = require("express");
const authRoutes = require("./routes/authRoutes"); // Import authRoutes
const adminRoutes = require("./routes/adminRoutes"); // Import adminRoutes

const app = express();
app.use(express.json());

// Use the auth routes
app.use("/auth", authRoutes); // Routes for /auth/register and /auth/login

// Use the admin routes
app.use("/admin", adminRoutes); // Routes for /admin/dashboard

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
