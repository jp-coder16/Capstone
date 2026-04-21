const Institution = require('../models/Institution');
const User = require('../models/User');
const AQI = require('../models/AQI');
const recommendationService = require('../services/recommendationService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.createInstitution = async (req, res) => {
  try {
    const { name, address, contactEmail, contactPhone } = req.body;
    const institution = await Institution.create({ name, address, contactEmail, contactPhone, adminId: req.user.id });
    // Update user's role and institutionId
    await User.findByIdAndUpdate(req.user.id, { role: 'institution', institutionId: institution._id });
    successResponse(res, institution, 'Institution created', 201);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.getInstitutionDashboard = async (req, res) => {
  try {
    const institution = await Institution.findById(req.user.institutionId);
    if (!institution) return errorResponse(res, 'Institution not found', 404);
    const latest = await AQI.findOne().sort({ date: -1 });
    if (!latest) return errorResponse(res, 'No AQI data', 404);
    const advice = recommendationService.getRecommendations(latest.aqi, latest.pm25);
    const dashboard = {
      aqi: latest.aqi,
      risk: advice.risk,
      outdoorAllowed: advice.outdoorAllowed,
      assemblyAllowed: advice.outdoorAllowed ? (latest.aqi < 150) : false, // simple rule
      safetyProtocol: advice.tips.join('; ')
    };
    successResponse(res, dashboard, 'Institution dashboard');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.getInstitutionAlerts = async (req, res) => {
  try {
    // For simplicity, return active global alerts
    const Alert = require('../models/Alert');
    const alerts = await Alert.find({ active: true, expiresAt: { $gt: new Date() } });
    successResponse(res, alerts);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.addUserToInstitution = async (req, res) => {
  try {
    const { email, role } = req.body; // role: 'user' or 'institution'
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 'User not found', 404);
    user.institutionId = req.user.institutionId;
    user.role = role || 'user';
    await user.save();
    successResponse(res, user, 'User added to institution');
  } catch (err) {
    errorResponse(res, err.message);
  }
};