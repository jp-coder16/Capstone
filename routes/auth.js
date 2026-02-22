const express = require('express');
const passport = require('passport');

const router = express.Router();

// 🔐 Middleware to protect dashboard
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// 🏠 Home route
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// 🖥 Login page
router.get('/login', (req, res) => {
  res.render('login'); // error/success come from res.locals via flash
});

// ================= NORMAL LOGIN =================
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
);

// ================= GOOGLE LOGIN =================
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// ================= DASHBOARD =================
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', {
    user: req.user
  });
});

// ================= LOGOUT =================
router.get('/logout', (req, res, next) => { // ✅ added next param
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
});

module.exports = router;