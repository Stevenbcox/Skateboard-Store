const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "stevencox",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "skateboard_store",
  password: process.env.DB_PASSWORD || "Password1",
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // Enable SSL for Render
});

module.exports = pool;
