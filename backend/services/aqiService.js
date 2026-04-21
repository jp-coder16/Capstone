const AQI = require('../models/AQI');

const getLatestAQI = async () => {
  return await AQI.findOne().sort({ date: -1 });
};

const getHistory = async (days = 7) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return await AQI.find({ date: { $gte: startDate } }).sort({ date: 1 });
};

const addAQIData = async (data) => {
  const aqiData = new AQI(data);
  await aqiData.save();
  return aqiData;
};

module.exports = { getLatestAQI, getHistory, addAQIData };