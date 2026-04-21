const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');
const { createInstitution, getInstitutionDashboard, getInstitutionAlerts, addUserToInstitution } = require('../controllers/institutionController');
const router = express.Router();

router.post('/create', verifyToken, roleCheck('institution'), createInstitution);
router.get('/dashboard', verifyToken, roleCheck('institution'), getInstitutionDashboard);
router.get('/alerts', verifyToken, roleCheck('institution'), getInstitutionAlerts);
router.post('/add-user', verifyToken, roleCheck('institution'), addUserToInstitution);

module.exports = router;