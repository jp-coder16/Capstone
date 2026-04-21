const Alert = require('../models/Alert');

const getActiveAlerts = async () => {
  return await Alert.find({ active: true, expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 });
};

const createAlert = async (alertData) => {
  const alert = new Alert(alertData);
  await alert.save();
  return alert;
};

module.exports = { getActiveAlerts, createAlert };