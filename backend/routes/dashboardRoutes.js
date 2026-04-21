const express = require('express');
const router = express.Router();
const { getDashboard, getSystemStats } = require('../controllers/dashboardController');

// ✅ ADD THIS LINE FIRST
router.get('/stats', getSystemStats); 

// GET /api/dashboard
router.get('/', getDashboard);

module.exports = router;