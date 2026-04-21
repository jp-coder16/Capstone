const express = require("express");
const axios = require("axios");
const { verifyToken } = require("../middleware/authMiddleware");
const AQI = require("../models/AQI");

const router = express.Router();

// Public prediction (no auth)
router.post("/predict", async (req, res) => {
  try {
    // Expect 11 features (must match your model)
    const required = ["pm25","pm10","no2","so2","co","o3","temp","humidity","wind","day_of_week","month"];
    for (let f of required) {
      if (req.body[f] === undefined) {
        return res.status(400).json({ error: `Missing field: ${f}` });
      }
    }

    const mlResponse = await axios.post("http://localhost:8000/predict", req.body, { timeout: 15000 });
    
    // mlResponse.data includes: predicted_aqi, risk, recommendations, shap_values
    res.json({ success: true, ...mlResponse.data });
  } catch (err) {
    console.error(err.message);
    if (err.code === 'ECONNREFUSED') {
      res.status(503).json({ error: 'ML service not running on port 8000' });
    } else {
      res.status(500).json({ error: 'Prediction failed', details: err.message });
    }
  }
});

// Protected version (with saving to DB)
router.post("/predict-protected", verifyToken, async (req, res) => {
  try {
    const mlResponse = await axios.post("http://localhost:8000/predict", req.body);
    await AQI.create({ date: new Date(), ...req.body, aqi: mlResponse.data.predicted_aqi });
    res.json({ success: true, user: req.user.id, ...mlResponse.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;