const express = require("express");
const authRoutes = require("./routes/authRoutes"); // Import authRoutes

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes); // Use authRoutes for /auth endpoints

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
