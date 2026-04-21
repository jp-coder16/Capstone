const axios = require('axios');
const { ML_SERVICE_URL } = require('../config/env');

/**
 * Call ML microservice /predict endpoint
 * Expected input: { pm25, pm10, no2, so2, co, o3, temp, humidity, wind }
 * Output: { predicted_aqi, risk, top_factors }
 */
const getPrediction = async (features) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, features, { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error('ML service error:', error.message);
    // Fallback if ML service down
    return {
      predicted_aqi: 150,
      risk: 'Medium',
      top_factors: { pm25: 0.6, pm10: 0.3, no2: 0.1 }
    };
  }
};

module.exports = { getPrediction };