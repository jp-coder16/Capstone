const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET /signup - Render signup page
router.get('/signup', (req, res) => {
  res.render('signup', { error: [], success: [] });
});

// POST /signup - Handle registration
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    return res.render('signup', {
      error: ['All fields are required.'],
      success: []
    });
  }

  if (password !== confirmPassword) {
    return res.render('signup', {
      error: ['Passwords do not match.'],
      success: []
    });
  }

  if (password.length < 6) {
    return res.render('signup', {
      error: ['Password must be at least 6 characters.'],
      success: []
    });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', {
        error: ['An account with that email already exists.'],
        success: []
      });
    }

    // Save user — password hashed automatically by User model's pre('save') hook
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Auto login then redirect to dashboard
    req.login(newUser, (err) => {
      if (err) {
        console.error('Auto-login error:', err);
        return res.render('login', {
          error: [],
          success: ['Account created! Please log in.']
        });
      }
      res.redirect('/dashboard');
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.render('signup', {
      error: ['Something went wrong. Please try again.'],
      success: []
    });
  }
});

module.exports = router;