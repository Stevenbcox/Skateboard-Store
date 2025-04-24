const express = require("express");
const cors = require("cors"); // Import cors
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const skateboardRoutes = require("./routes/skateboardRoutes");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Enable CORS
app.use(cors()); // Allow all origins by default

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Use the auth routes
app.use("/auth", authRoutes);

app.use("/api", authRoutes);

// Use the admin routes
app.use("/admin", adminRoutes);

// Use the skateboard routes
app.use("/api/skateboards", skateboardRoutes);

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route to serve the frontend for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
