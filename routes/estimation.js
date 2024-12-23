const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createEstimate,
  getEstimates,
} = require("../controllers/estimationController");
const {
  calculateProfitability,
} = require("../controllers/CropProfitabilityController");
const router = express.Router();

// Routes
router.post("/", protect, createEstimate); // Create a new estimate
router.get("/", protect, getEstimates); // Get all estimates for the logged-in user
router.post("/profitability", calculateProfitability);

module.exports = router;
