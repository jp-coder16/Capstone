const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_URL || "http://ml:8000";

// Create reusable axios instance (faster)
const axiosInstance = axios.create({
  baseURL: ML_SERVICE_URL,
  timeout: 2000, // ⚡ fast fail
});

// 🔥 Wait for ML service before using it
const waitForML = async () => {
  let retries = 10;

  while (retries > 0) {
    try {
      await axiosInstance.get('/health');
      console.log("✅ ML Service Ready");
      return;
    } catch (err) {
      console.log("⏳ Waiting for ML service...");
      await new Promise(r => setTimeout(r, 2000));
      retries--;
    }
  }

  throw new Error("❌ ML service not available");
};

// Call ML service
const getPrediction = async (features) => {
  try {
    const today = new Date();

    const payload = {
      ...features,
      day_of_week: today.getDay(),
      month: today.getMonth() + 1,
    };

    const response = await axiosInstance.post('/predict', payload);

    return {
      predicted_aqi: response.data.predicted_aqi,
      risk: response.data.risk,
      recommendations: response.data.recommendations,
      top_factors: response.data.shap_values,
    };

  } catch (error) {
    console.error("❌ ML SERVICE ERROR:", error.message);
    throw new Error("ML service unavailable"); // ❗ no fake data
  }
};

module.exports = {
  getPrediction,
  waitForML
};