const express = require('express');
const { getForecast, getRisk, getXAI, predict, explain } = require('../controllers/mlController');
const router = express.Router();

router.get('/forecast', getForecast);
router.get('/risk',     getRisk);
router.get('/xai',      getXAI);
// Also accessible via /api/ml/predict and /api/ml/explain directly
router.post('/predict', predict);
router.post('/explain', explain);

module.exports = router;
