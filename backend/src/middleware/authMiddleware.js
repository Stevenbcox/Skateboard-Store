require("dotenv").config();
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");

// Secret key for JWT (use environment variables for security)
const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret_key";

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded token payload to the request object
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Middleware to check if the user is an admin
const checkAdmin = async (req, res, next) => {
  const { id } = req.user;

  try {
    const result = await pool.query(
      "SELECT is_admin FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!result.rows[0].is_admin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next();
  } catch (err) {
    console.error("Database query failed:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { verifyToken, checkAdmin };
