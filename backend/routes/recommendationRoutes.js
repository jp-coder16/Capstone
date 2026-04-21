    const express = require('express');
const { getAdvice } = require('../controllers/recommendationController');
const router = express.Router();

router.get('/advice', getAdvice);

module.exports = router;