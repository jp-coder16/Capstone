const express = require('express');
const router = express.Router();
const { triggerAlerts } = require('../controllers/alertController');

router.post('/trigger', triggerAlerts);

module.exports = router;