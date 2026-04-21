require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  ML_SERVICE_URL: process.env.ML_SERVICE_URL || 'http://localhost:8000',
  NODE_ENV: process.env.NODE_ENV || 'development'
};