const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5000';

exports.getPrediction = async () => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/forecast`);
    return response.data;
  } catch (err) {
    console.error('ML service unreachable → using fallback');
    return {
      day1: 105,
      day2: 118,
      day3: 98,
      message: "ML service fallback (check if ml/app.py is running)"
    };
  }
};