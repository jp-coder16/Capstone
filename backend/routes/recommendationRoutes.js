const express = require('express');
const { getAdvice, recommend } = require('../controllers/recommendationController');
const router = express.Router();

router.get('/advice',  getAdvice);
router.post('/',       recommend);   // also accessible via /api/recommendation/

module.exports = router;
