const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    farmSize: { type: Number, required: true },
    cropType: { type: String, required: true },
    location: { type: String, required: true },
    bulldozingCost: { type: Number, required: true },
    ploughingCost: { type: Number, required: true },
    fertilizerCost: { type: Number, required: true },
    irrigationCost: { type: Number, required: true },
    pestControlCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    advice: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Estimate", estimateSchema);
