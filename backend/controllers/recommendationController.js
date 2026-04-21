const aqiService = require('../services/aqiService');
const recommendationService = require('../services/recommendationService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// POST /api/recommend  — Bug Fix 5
// Frontend sends: { aqi, userType }
exports.recommend = async (req, res) => {
  try {
    const { aqi, userType } = req.body || {};
    let aqiValue = parseFloat(aqi);

    // If no aqi in body, fall back to latest from DB
    if (isNaN(aqiValue)) {
      const latest = await aqiService.getLatestAQI();
      if (!latest) return errorResponse(res, 'No AQI data available', 404);
      aqiValue = latest.aqi;
    }

    const advice = recommendationService.getRecommendations(aqiValue, 0);
    successResponse(res, { ...advice, userType: userType || 'general' }, 'Recommendations generated');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

// GET /api/recommendation/advice  (original route, kept for compatibility)
exports.getAdvice = async (req, res) => {
  try {
    const latest = await aqiService.getLatestAQI();
    if (!latest) return errorResponse(res, 'No AQI data', 404);
    const advice = recommendationService.getRecommendations(latest.aqi, latest.pm25);
    successResponse(res, advice, 'Recommendations generated');
  } catch (err) {
    errorResponse(res, err.message);
  }
};
