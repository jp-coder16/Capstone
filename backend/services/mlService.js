const axios = require('axios');
const { ML_SERVICE_URL } = require('../config/env');

/**
 * Call ML microservice /predict endpoint
 * Expected input by Python: { pm25, pm10, no2, so2, co, o3, temp, humidity, wind, day_of_week, month }
 */
const getPrediction = async (features) => {
  try {
    // Append the time-based features required by XGBoost
    const today = new Date();
    const mlPayload = {
      ...features,
      day_of_week: today.getDay(),     // 0 (Sun) to 6 (Sat)
      month: today.getMonth() + 1      // 1 (Jan) to 12 (Dec)
    };

    // Make the call to the Python FastAPI server
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, mlPayload, { timeout: 5000 });
    
    // Map the python response to the backend schema
    return {
      predicted_aqi: response.data.predicted_aqi,
      risk: response.data.risk,
      recommendations: response.data.recommendations,
      top_factors: response.data.shap_values
    };
  } catch (error) {
    console.error('ML service error:', error.message);
    // Fallback if ML service is down so the dashboard doesn't crash
    return {
      predicted_aqi: 150,
      risk: 'Moderate',
      recommendations: ['Consider wearing a mask outdoors', 'Limit prolonged exertion'],
      top_factors: { pm25: 0.6, pm10: 0.3, no2: 0.1 }
    };
  }
};

module.exports = { getPrediction };