const aqiService = require('../services/aqiService');
const recommendationService = require('../services/recommendationService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

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