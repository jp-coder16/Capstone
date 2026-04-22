const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

app.set('trust proxy', 1);
// --- Global Middleware ---
// Security headers
app.use(helmet());
// Allow frontend communication
app.use(cors({ origin: '*' })); // In production, restrict this to your frontend URL
// Body parser
app.use(express.json());
// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate Limiting (Max 100 requests per 15 mins per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// --- Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ml', require('./routes/mlRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/aqi', require('./routes/aqiRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

// Add others as you build them:
// app.use('/api/aqi', require('./routes/aqiRoutes'));
// app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'AQI Platform API is running...' });
});

// --- Error Handling Middleware ---
app.use(notFound);      // Catches 404s
app.use(errorHandler);  // Formats all other errors

module.exports = app;