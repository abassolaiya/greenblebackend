const mongoose = require("mongoose");

const inputRatesSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    bulldozingCostPerHectare: { type: Number },
    ploughingCostPerHectare: { type: Number },
    fertilizerCostPerHectare: { type: Number },
    irrigationCostPerHectare: { type: Number },
    pestControlCostPerHectare: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InputRates", inputRatesSchema);
