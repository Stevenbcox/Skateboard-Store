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

module.exports = router;
