const { Pool } = require("pg");

// PostgreSQL connection configuration
const pool = new Pool({
  user: process.env.DB_USER || "stevencox",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "skateboard_store",
  password: process.env.DB_PASSWORD || "Password1",
  port: process.env.DB_PORT || 5432,
});

// Middleware to check if the user is an admin
const checkAdmin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const result = await pool.query(
      "SELECT is_admin FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0 || !result.rows[0].is_admin) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkAdmin };

// // Example admin-only route
// app.get("/admin/dashboard", checkAdmin, (req, res) => {
//   res.status(200).json({ message: "Welcome to the admin dashboard!" });
// });
