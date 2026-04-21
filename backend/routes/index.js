const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/aqi', require('./aqiRoutes'));
router.use('/ml', require('./mlRoutes'));
router.use('/recommendation', require('./recommendationRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));
router.use('/user', require('./userRoutes'));
router.use('/institution', require('./institutionRoutes'));
router.use('/alerts', require('./alertRoutes'));
router.use('/chat', require('./chatbotRoutes'));
router.use('/admin', require('./adminRoutes'));

module.exports = router;