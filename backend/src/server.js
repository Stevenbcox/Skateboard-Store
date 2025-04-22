const express = require("express");
const cors = require("cors"); // Import cors
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const skateboardRoutes = require("./routes/skateboardRoutes");

const app = express();

// Enable CORS
app.use(cors()); // Allow all origins by default

app.use(express.json());

// Use the auth routes
app.use("/auth", authRoutes);

app.use("/api", authRoutes);

// Use the admin routes
app.use("/admin", adminRoutes);

// Use the skateboard routes
app.use("/api/skateboards", skateboardRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
