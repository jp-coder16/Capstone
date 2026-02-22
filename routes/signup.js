const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET /signup - Render signup page
router.get('/signup', (req, res) => {
  res.render('signup'); // error/success come from res.locals via flash
});

// POST /signup - Handle registration
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    req.flash('error', 'All fields are required.');
    return res.redirect('/signup');
  }

  if (password !== confirmPassword) {
    req.flash('error', 'Passwords do not match.');
    return res.redirect('/signup');
  }

  if (password.length < 6) {
    req.flash('error', 'Password must be at least 6 characters.');
    return res.redirect('/signup');
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'An account with that email already exists.');
      return res.redirect('/signup');
    }

    // Save user — password hashed automatically by User model's pre('save') hook
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Auto login then redirect to dashboard
    req.login(newUser, (err) => {
      if (err) {
        console.error('Auto-login error:', err);
        req.flash('success', 'Account created! Please log in.');
        return res.redirect('/login');
      }
      res.redirect('/dashboard');
    });

  } catch (err) {
    console.error('Signup error:', err);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/signup');
  }
});

module.exports = router;