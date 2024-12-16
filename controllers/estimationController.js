const Estimate = require("../models/Estimate");
const InputRates = require("../models/InputRates");

// Create Estimate
exports.createEstimate = async (req, res) => {
  const { farmSize, cropType, location } = req.body;

  try {
    const rates = await InputRates.findOne({ location });
    if (!rates)
      return res.status(404).json({ message: "Rates for location not found" });

    const bulldozingCost = rates.bulldozingCostPerHectare * farmSize;
    const ploughingCost = rates.ploughingCostPerHectare * farmSize;
    const fertilizerCost = rates.fertilizerCostPerHectare * farmSize;
    const irrigationCost = rates.irrigationCostPerHectare * farmSize;
    const pestControlCost = rates.pestControlCostPerHectare * farmSize;

    const totalCost =
      bulldozingCost +
      ploughingCost +
      fertilizerCost +
      irrigationCost +
      pestControlCost;

    let advice = "";
    if (cropType === "maize") {
      advice = "Maize grows best in loamy soil with consistent irrigation.";
    } else if (cropType === "rice") {
      advice = "Rice requires flooded fields and proper pest control.";
    }

    const estimate = await Estimate.create({
      user: req.user._id,
      farmSize,
      cropType,
      location,
      bulldozingCost,
      ploughingCost,
      fertilizerCost,
      irrigationCost,
      pestControlCost,
      totalCost,
      advice,
    });

    res.status(201).json(estimate);
  } catch (error) {
    res.status(500).json({ message: "Error creating estimate" });
  }
};

// Get Estimates for Logged-in User
exports.getEstimates = async (req, res) => {
  try {
    const estimates = await Estimate.find({ user: req.user._id });
    res.json(estimates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching estimates" });
  }
};
