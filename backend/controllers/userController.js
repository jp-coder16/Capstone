const User = require('../models/User');
const AQI = require('../models/AQI');
const recommendationService = require('../services/recommendationService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.getUserDashboard = async (req, res) => {
  try {
    const user = req.user;
    const latestAQI = await AQI.findOne().sort({ date: -1 });
    if (!latestAQI) return errorResponse(res, 'No AQI data', 404);
    const advice = recommendationService.getRecommendations(latestAQI.aqi, latestAQI.pm25);
    successResponse(res, { user: { name: user.name, email: user.email }, aqi: latestAQI, advice });
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.getExposureScore = async (req, res) => {
  try {
    // Dummy exposure score based on average AQI over last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const records = await AQI.find({ date: { $gte: sevenDaysAgo } }).sort({ date: -1 });
    if (records.length === 0) return errorResponse(res, 'No data', 404);
    const avgAQI = records.reduce((sum, r) => sum + r.aqi, 0) / records.length;
    let score = 100 - (avgAQI / 5);
    score = Math.min(100, Math.max(0, score));
    successResponse(res, { exposureScore: Math.round(score), averageAQI: avgAQI.toFixed(1) });
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.getUserRecommendations = async (req, res) => {
  try {
    const latest = await AQI.findOne().sort({ date: -1 });
    if (!latest) return errorResponse(res, 'No AQI data', 404);
    const recs = recommendationService.getRecommendations(latest.aqi, latest.pm25);
    successResponse(res, recs);
  } catch (err) {
    errorResponse(res, err.message);
  }
};