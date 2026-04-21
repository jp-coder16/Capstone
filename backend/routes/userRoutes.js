const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { getUserDashboard, getExposureScore, getUserRecommendations } = require('../controllers/userController');
const router = express.Router();

router.get('/dashboard', verifyToken, getUserDashboard);
router.get('/exposure-score', verifyToken, getExposureScore);
router.get('/recommendations', verifyToken, getUserRecommendations);

module.exports = router;