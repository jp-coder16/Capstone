require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/aqi_platform',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  JWT_EXPIRE: '7d',
  ML_SERVICE_URL: process.env.ML_SERVICE_URL || 'http://localhost:5000'
};