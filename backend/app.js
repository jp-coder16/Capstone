const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { globalLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorMiddleware');
const routes = require('./routes');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Security & middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(globalLimiter);

// API routes
app.use('/api', routes);

// Serve static files if needed (for uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling
app.use(errorHandler);

module.exports = app;