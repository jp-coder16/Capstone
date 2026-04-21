const aqiService = require('../services/aqiService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.getCurrentAQI = async (req, res) => {
  try {
    const current = await aqiService.getLatestAQI();
    if (!current) return errorResponse(res, 'No AQI data available', 404);
    successResponse(res, current, 'Current AQI fetched');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.getHistory = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const history = await aqiService.getHistory(days);
    successResponse(res, history, `Last ${days} days history`);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.addAQIData = async (req, res) => {
  try {
    const newData = await aqiService.addAQIData(req.body);
    successResponse(res, newData, 'AQI data added', 201);
  } catch (err) {
    errorResponse(res, err.message);
  }
};