const axios = require("axios");

exports.getPrediction = async () => {
  try {
    const response = await axios.get("http://localhost:5000/predict");

    return response.data;
  } catch (err) {
    throw new Error("ML service failed");
  }
};