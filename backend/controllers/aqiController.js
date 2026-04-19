const AQI = require("../models/AQI");

// Get latest AQI
exports.getCurrentAQI = async (req, res) => {
  try {
    const data = await AQI.findOne().sort({ date: -1 });

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching AQI" });
  }
};
const { getPrediction } = require("../services/predictionService");

exports.getForecast = async (req, res) => {
  try {
    const prediction = await getPrediction();

    res.json({
      success: true,
      prediction
    });
  } catch (err) {
    res.status(500).json({ message: "Prediction failed" });
  }
};

// Get last 7 days (for graphs / ML input)
exports.getHistory = async (req, res) => {
  try {
    const data = await AQI.find()
      .sort({ date: -1 })
      .limit(7);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
};  

const { getRecommendation } = require("../services/recommendationService");

exports.getSmartAdvice = async (req, res) => {
  try {
    const latest = await AQI.findOne().sort({ date: -1 });

    const advice = getRecommendation(latest);

    res.json({
      aqi: latest.aqi,
      advice
    });
  } catch (err) {
    res.status(500).json({ message: "Recommendation failed" });
  }
};

exports.getFullDashboard = async (req, res) => {
  try {
    const latest = await AQI.findOne().sort({ date: -1 });
    const prediction = await getPrediction();
    const advice = getRecommendation(latest);

    res.json({
      currentAQI: latest,
      forecast: prediction,
      recommendation: advice
    });

  } catch (err) {
    res.status(500).json({ message: "Dashboard failed" });
  }
};