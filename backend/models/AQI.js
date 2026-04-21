const mongoose = require('mongoose');

const aqiSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  pm25: Number,
  pm10: Number,
  no2: Number,
  so2: Number,
  co: Number,
  o3: Number,
  temp: Number,
  humidity: Number,
  wind: Number,
  aqi: Number
});

module.exports = mongoose.model('AQI', aqiSchema);