const express = require('express');
const { getForecast, getRisk, getXAI } = require('../controllers/mlController');
const router = express.Router();

router.get('/forecast', getForecast);
router.get('/risk', getRisk);
router.get('/xai', getXAI);

module.exports = router;