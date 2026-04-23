const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

app.set('trust proxy', 1);

// --- Global Middleware ---
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);


// ✅ ✅ ADD HEALTH ROUTE HERE (IMPORTANT)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'backend',
    timestamp: new Date()
  });
});


// --- Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ml', require('./routes/mlRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/aqi', require('./routes/aqiRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));


// Test route
app.get('/', (req, res) => {
  res.json({ message: 'AQI Platform API is running...' });
});


// --- Error Handling Middleware ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;