const express = require('express');
const { signup, login, getProfile } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/register', signup);   // Bug Fix 2: alias so frontend /auth/register works
router.post('/login', login);
router.get('/profile', verifyToken, getProfile);

module.exports = router;
