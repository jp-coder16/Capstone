const alertService = require('../services/alertService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// @desc    Manually trigger the alert check system
// @route   POST /api/alerts/trigger
// @access  Admin (or public for testing)
exports.triggerAlerts = async (req, res) => {
  try {
    const result = await alertService.sendHighRiskAlerts();
    successResponse(res, result, result.message);
  } catch (error) {
    errorResponse(res, 'Failed to trigger alerts: ' + error.message, 500);
  }
};