const mlService = require('../services/mlService');
const aqiService = require('../services/aqiService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// POST /api/predict  — Bug Fix 4
// Frontend sends: { pm25, pm10, no2, so2, co, o3, temperature, humidity }
exports.predict = async (req, res) => {
  try {
    const body = req.body || {};
    const features = {
      pm25:     parseFloat(body.pm25)     || 0,
      pm10:     parseFloat(body.pm10)     || 0,
      no2:      parseFloat(body.no2)      || 0,
      so2:      parseFloat(body.so2)      || 0,
      co:       parseFloat(body.co)       || 0,
      o3:       parseFloat(body.o3)       || 0,
      temp:     parseFloat(body.temperature || body.temp) || 25,
      humidity: parseFloat(body.humidity) || 50,
      wind:     parseFloat(body.wind)     || 5,
    };
    const prediction = await mlService.getPrediction(features);
    successResponse(res, {
      predicted_aqi: prediction.predicted_aqi,
      risk:          prediction.risk,
      top_factors:   prediction.top_factors,
    }, 'Prediction generated');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

// POST /api/explain  — Bug Fix 6
// Frontend sends: { features: { pm25, ... } }
exports.explain = async (req, res) => {
  try {
    const features = req.body?.features || req.body || {};
    const normalized = {
      pm25:     parseFloat(features.pm25)     || 0,
      pm10:     parseFloat(features.pm10)     || 0,
      no2:      parseFloat(features.no2)      || 0,
      so2:      parseFloat(features.so2)      || 0,
      co:       parseFloat(features.co)       || 0,
      o3:       parseFloat(features.o3)       || 0,
      temp:     parseFloat(features.temperature || features.temp) || 25,
      humidity: parseFloat(features.humidity) || 50,
      wind:     parseFloat(features.wind)     || 5,
    };
    const prediction = await mlService.getPrediction(normalized);
    successResponse(res, { top_factors: prediction.top_factors }, 'Feature importance');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

// GET /api/ml/forecast
exports.getForecast = async (req, res) => {
  try {
    const latest = await aqiService.getLatestAQI();
    if (!latest) return errorResponse(res, 'No current AQI data', 404);
    const features = {
      pm25: latest.pm25, pm10: latest.pm10, no2: latest.no2,
      so2: latest.so2,  co: latest.co,     o3: latest.o3,
      temp: latest.temp, humidity: latest.humidity, wind: latest.wind,
    };
    const prediction = await mlService.getPrediction(features);
    successResponse(res, { predicted_aqi: prediction.predicted_aqi }, 'Forecast generated');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

// GET /api/ml/risk
exports.getRisk = async (req, res) => {
  try {
    const latest = await aqiService.getLatestAQI();
    if (!latest) return errorResponse(res, 'No current AQI data', 404);
    const features = {
      pm25: latest.pm25, pm10: latest.pm10, no2: latest.no2,
      so2: latest.so2,   co: latest.co,     o3: latest.o3,
      temp: latest.temp, humidity: latest.humidity, wind: latest.wind,
    };
    const prediction = await mlService.getPrediction(features);
    successResponse(res, { risk: prediction.risk }, 'Risk level fetched');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

// GET /api/ml/xai
exports.getXAI = async (req, res) => {
  try {
    const latest = await aqiService.getLatestAQI();
    if (!latest) return errorResponse(res, 'No current AQI data', 404);
    const features = {
      pm25: latest.pm25, pm10: latest.pm10, no2: latest.no2,
      so2: latest.so2,   co: latest.co,     o3: latest.o3,
      temp: latest.temp, humidity: latest.humidity, wind: latest.wind,
    };
    const prediction = await mlService.getPrediction(features);
    successResponse(res, { top_factors: prediction.top_factors }, 'Feature importance');
  } catch (err) {
    errorResponse(res, err.message);
  }
};
