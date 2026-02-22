require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');

const app = express();

/* ================= BODY PARSER ================= */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ================= HEALTH CHECK ================= */
// Place BEFORE sessions/middleware so it always responds
app.get('/health', (req, res) => res.status(200).send('OK'));

/* ================= STATIC FILES ================= */
app.use(express.static(path.join(__dirname, 'public')));

/* ================= DATABASE CONNECTION ================= */
const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/capstone";

// Retry connection until MongoDB is ready
const connectWithRetry = () => {
  mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
      console.log("❌ MongoDB Connection Error:", err.message);
      console.log("Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

/* ================= SESSION ================= */
app.use(session({
  secret: process.env.SESSION_SECRET || "secretkey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoURI,
    collectionName: "sessions",
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: false // true if using HTTPS
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
app.use('/', require('./routes/signup'));

/* ================= 404 HANDLER ================= */
app.use((req, res) => res.status(404).render('404'));

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});