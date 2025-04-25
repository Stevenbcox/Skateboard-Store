const express = require("express");
const pool = require("../db/pool");

const router = express.Router();

// Get all skateboards
router.get("/", async (req, res) => {
  try {
    console.log("Fetching skateboards...");
    const result = await pool.query("SELECT * FROM skateboards");
    console.log("Skateboards fetched:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching skateboards:", err);
    res.status(500).json({ error: "Failed to fetch skateboards" });
  }
});

// Get a skateboard by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM skateboards WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Skateboard not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/api/skateboards", async (req, res) => {
  const { name, brand, size, price, stock, image_url, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO skateboards (name, brand, size, price, stock, image_url, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, brand, size, price, stock, image_url, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.delete("/api/skateboards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM skateboards WHERE id = $1", [id]);
    res.json({ message: "Skateboard deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
