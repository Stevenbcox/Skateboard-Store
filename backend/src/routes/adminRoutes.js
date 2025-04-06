const express = require("express");
const { verifyToken, checkAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin dashboard route
router.get("/dashboard", verifyToken, checkAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard!" });
});

module.exports = router;
