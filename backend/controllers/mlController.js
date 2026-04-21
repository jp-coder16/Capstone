const mlService = require('../services/mlService');
const aqiService = require('../services/aqiService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.getForecast = async (req, res) => {
  try {
    const latest = await aqiService.getLatestAQI();
    if (!latest) return errorResponse(res, 'No current AQI data', 404);
    const features = {
      pm25: latest.pm25,
      pm10: latest.pm10,
      no2: latest.no2,
      so2: latest.so2,
      co: latest.co,
      o3: latest.o3,
      temp: latest.temp,
      humidity: latest.humidity,
      wind: latest.wind
    };
    const prediction = await mlService.getPrediction(features);
    successResponse(res, { predicted_aqi: prediction.predicted_aqi }, 'Forecast generated');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.getRisk = async (req, res) => {
  try {
    const latest = await aqiService.getLatestAQI();
    if (!latest) return errorResponse(res, 'No current AQI data', 404);
    const features = {
      pm25: latest.pm25,
      pm10: latest.pm10,
      no2: latest.no2,
      so2: latest.so2,
      co: latest.co,
      o3: latest.o3,
      temp: latest.temp,
      humidity: latest.humidity,
      wind: latest.wind
    };
    const prediction = await mlService.getPrediction(features);
    successResponse(res, { risk: prediction.risk }, 'Risk level fetched');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.getXAI = async (req, res) => {
  try {
    const latest = await aqiService.getLatestAQI();
    if (!latest) return errorResponse(res, 'No current AQI data', 404);
    const features = {
      pm25: latest.pm25,
      pm10: latest.pm10,
      no2: latest.no2,
      so2: latest.so2,
      co: latest.co,
      o3: latest.o3,
      temp: latest.temp,
      humidity: latest.humidity,
      wind: latest.wind
    };
    const prediction = await mlService.getPrediction(features);
    successResponse(res, { top_factors: prediction.top_factors }, 'Feature importance');
  } catch (err) {
    errorResponse(res, err.message);
  }
};