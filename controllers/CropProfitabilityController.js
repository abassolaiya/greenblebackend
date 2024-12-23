const CropConfiguration = require("../models/CropProfitability");

exports.createOrUpdateCropConfig = async (req, res) => {
  const {
    cropType,
    yieldPerHectare,
    unforeseenLossPercentage,
    pricePerTon,
    setupCostPerHectare,
    additionalAdvisory,
  } = req.body;

  try {
    const config = await CropConfiguration.findOneAndUpdate(
      { cropType },
      {
        yieldPerHectare,
        unforeseenLossPercentage,
        pricePerTon,
        setupCostPerHectare,
        additionalAdvisory,
      },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json({ success: true, data: config });
  } catch (error) {
    console.error("Error creating/updating crop config:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to save crop configuration" });
  }
};

exports.calculateProfitability = async (req, res) => {
  const { cropType, farmSize, farmLocation } = req.body;

  try {
    // Fetch crop-specific configuration
    const cropConfig = await CropConfiguration.findOne({ cropType });
    if (!cropConfig) {
      return res
        .status(404)
        .json({ success: false, error: "Crop configuration not found" });
    }

    // Extract config values
    const {
      yieldPerHectare,
      unforeseenLossPercentage,
      pricePerTon,
      setupCostPerHectare,
      additionalAdvisory,
    } = cropConfig;

    // Profitability Calculations
    const totalYield = yieldPerHectare * farmSize;
    const localSalesYield = totalYield * 0.85; // 85% local sales
    const unforeseenLoss = totalYield * (unforeseenLossPercentage / 100);
    const grossROI = localSalesYield * pricePerTon;
    const totalSetupCost = setupCostPerHectare * farmSize;
    const netProfit = grossROI - totalSetupCost;

    res.status(200).json({
      success: true,
      data: {
        cropType,
        farmSize,
        farmLocation,
        grossROI,
        netProfit,
        advisory: [
          ...additionalAdvisory,
          "Mitigation of risk using smart farm digital mapping",
          "Scaling above expected target yield",
          "Insurance claim in case of fire",
          "Climate-smart solutions",
        ],
      },
    });
  } catch (error) {
    console.error("Profitability Calculation Error:", error);
    res.status(500).json({ success: false, error: "Calculation failed" });
  }
};
