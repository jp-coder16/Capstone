const alertService = require('../services/alertService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.getCurrentAlerts = async (req, res) => {
  try {
    const alerts = await alertService.getActiveAlerts();
    successResponse(res, alerts);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.createAlert = async (req, res) => {
  try {
    const alertData = { ...req.body, issuedBy: req.user.id };
    const alert = await alertService.createAlert(alertData);
    successResponse(res, alert, 'Alert created', 201);
  } catch (err) {
    errorResponse(res, err.message);
  }
};