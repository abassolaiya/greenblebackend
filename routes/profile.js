const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");
const router = express.Router();

// Routes
router.get("/", protect, getProfile); // Get user profile
router.put("/", protect, updateProfile); // Update user profile

module.exports = router;
