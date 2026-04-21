const express = require('express');
const { signup, login, getProfile } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const { validate, signupSchema, loginSchema } = require('../middleware/validationMiddleware');
const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/profile', verifyToken, getProfile);

module.exports = router;