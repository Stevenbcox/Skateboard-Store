const { Pool } = require("pg");

const pool = new Pool({
  user: "stevencox",
  host: "localhost",
  database: "skateboard_store",
  password: "Password1", // Update to the correct password
  port: 5432,
});

module.exports = pool;
