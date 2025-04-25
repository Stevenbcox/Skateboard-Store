const { Pool } = require("pg");

const pool = new Pool({
  user: "stevencox",
  host: "localhost",
  database: "skateboard_store",
  password: "Password1", 
  port: 5432,
});

module.exports = pool;
