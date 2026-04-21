const express = require('express');
const { getCurrentAlerts, createAlert } = require('../controllers/alertController');
const { verifyToken } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');
const { validate, alertCreateSchema } = require('../middleware/validationMiddleware');
const router = express.Router();

router.get('/current', getCurrentAlerts);
router.post('/create', verifyToken, roleCheck('admin'), validate(alertCreateSchema), createAlert);

module.exports = router;