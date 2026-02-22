require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');

const app = express();

/* ================= DATABASE ================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

/* ================= BODY PARSER ================= */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ================= STATIC FILES ================= */

app.use(express.static(path.join(__dirname, 'public')));

/* ================= SESSION ================= */

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: false // change to true in production with HTTPS
  }
}));

/* ================= PASSPORT ================= */

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

/* ================= FLASH ================= */

app.use(flash());

/* ================= GLOBAL VARIABLES ================= */

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.user = req.user || null;
  next();
});

/* ================= VIEW ENGINE ================= */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* ================= ROUTES ================= */

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/signup')); // ✅ THIS WAS MISSING

/* ================= 404 ================= */

app.use((req, res) => {
  res.status(404).render('404');
});

/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
/* ================= SERVER ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});