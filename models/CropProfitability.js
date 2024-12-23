const mongoose = require("mongoose");

const CropConfigurationSchema = new mongoose.Schema({
  cropType: { type: String, required: true, unique: true }, // Cassava, Cocoa, etc.
  yieldPerHectare: { type: Number, required: true }, // e.g., 15 tons/ha
  unforeseenLossPercentage: { type: Number, required: true }, // e.g., 15%
  pricePerTon: { type: Number, required: true }, // e.g., ₦100,000
  setupCostPerHectare: { type: Number, required: true }, // e.g., ₦50,000
  additionalAdvisory: [String], // List of advisory points
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CropConfiguration", CropConfigurationSchema);
