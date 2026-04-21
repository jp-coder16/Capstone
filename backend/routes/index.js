const express = require('express');
const router = express.Router();

// ── Feature routes (match frontend api.js calls exactly) ──────────────────────

// Bug Fix 4: POST /api/predict  (frontend: predictAQI)
router.post('/predict',   require('../controllers/mlController').predict);

// Bug Fix 5: POST /api/recommend  (frontend: recommendActions)
router.post('/recommend', require('../controllers/recommendationController').recommend);

// Bug Fix 6: POST /api/explain  (frontend: explainPrediction)
router.post('/explain',   require('../controllers/mlController').explain);

// ── Resource routes ───────────────────────────────────────────────────────────
router.use('/auth',           require('./authRoutes'));
router.use('/aqi',            require('./aqiRoutes'));
router.use('/ml',             require('./mlRoutes'));
router.use('/recommendation', require('./recommendationRoutes'));
router.use('/dashboard',      require('./dashboardRoutes'));
router.use('/user',           require('./userRoutes'));
router.use('/institution',    require('./institutionRoutes'));
router.use('/alerts',         require('./alertRoutes'));
router.use('/chat',           require('./chatbotRoutes'));
router.use('/admin',          require('./adminRoutes'));

module.exports = router;
