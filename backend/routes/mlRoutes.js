const express = require('express');
const router = express.Router();
const { predict, explain, getForecast, getRisk, getXAI } = require('../controllers/mlController');

router.post('/predict', predict);
router.post('/explain', explain);
router.get('/forecast', getForecast);
router.get('/risk', getRisk);
router.get('/xai', getXAI);

module.exports = router;