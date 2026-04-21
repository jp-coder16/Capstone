const mongoose = require('mongoose');

const aqiSchema = new mongoose.Schema({
  location: { type: String, default: 'Main Station' },
  date: { type: Date, default: Date.now },
  aqi: { type: Number, default: 0 },
  pm25: { type: Number, default: 0 },
  pm10: { type: Number, default: 0 },
  no2: { type: Number, default: 0 },
  so2: { type: Number, default: 0 },
  co: { type: Number, default: 0 },
  o3: { type: Number, default: 0 },
  temperature: { type: Number, default: 25 },
  humidity: { type: Number, default: 50 },
  wind: { type: Number, default: 5 }
});

module.exports = mongoose.model('AQI', aqiSchema);