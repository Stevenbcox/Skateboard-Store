const { Pool } = require("pg");

// PostgreSQL connection configuration
const pool = new Pool({
  user: "stevencox",
  host: "localhost",
  database: "skateboard_store",
  password: "Password1",
  port: 5432,
});

// Function to create tables in the database
const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE, -- New column for admin status
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS skateboards (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        brand VARCHAR(50) NOT NULL,
        size VARCHAR(20) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        skateboard_id INT NOT NULL,
        quantity INT NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (skateboard_id) REFERENCES skateboards (id) ON DELETE CASCADE
      );
    `);

    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    client.release();
  }
};

// Execute the function to create tables
createTables();
