const express = require("express");
const pool = require("../db/pool");

const router = express.Router();

// Get all skateboards
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, brand, size, price, stock, image_url FROM skateboards"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
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

module.exports = router;
