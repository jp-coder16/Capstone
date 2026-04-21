const aqiService = require('../services/aqiService');
const mlService = require('../services/mlService');
const recommendationService = require('../services/recommendationService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.getDashboard = async (req, res) => {
  try {
    const current = await aqiService.getLatestAQI();
    if (!current) return errorResponse(res, 'No AQI data', 404);
    const features = {
      pm25: current.pm25,
      pm10: current.pm10,
      no2: current.no2,
      so2: current.so2,
      co: current.co,
      o3: current.o3,
      temp: current.temp,
      humidity: current.humidity,
      wind: current.wind
    };
    const prediction = await mlService.getPrediction(features);
    const recommendations = recommendationService.getRecommendations(prediction.predicted_aqi, current.pm25);
    const dashboardData = {
      currentAQI: current,
      forecast: prediction.predicted_aqi,
      risk: prediction.risk,
      xai: { top_factors: prediction.top_factors },
      recommendation: recommendations
    };
    successResponse(res, dashboardData, 'Dashboard data');
  } catch (err) {
    errorResponse(res, err.message);
  }
};