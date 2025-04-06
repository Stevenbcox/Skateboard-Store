const { Pool } = require("pg");

// PostgreSQL connection configuration
const pool = new Pool({
  user: "stevencox",
  host: "localhost",
  database: "skateboard_store",
  password: "Password1", // Update to the correct password
  port: 5432,
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
