const AQI = require('../models/AQI');
const recommendationService = require('../services/recommendationService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return errorResponse(res, 'Message required', 400);
    const latest = await AQI.findOne().sort({ date: -1 });
    if (!latest) return errorResponse(res, 'No AQI data available', 404);
    const advice = recommendationService.getRecommendations(latest.aqi, latest.pm25);
    let reply = "I'm sorry, I don't understand that question.";
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('go outside') || lowerMsg.includes('outside today')) {
      reply = advice.outdoorAllowed 
        ? `Yes, you can go outside. ${advice.workout}. Wear mask: ${advice.mask}.` 
        : `No, it's not safe to go outside. ${advice.workout}. Wear ${advice.mask} if necessary.`;
    } else if (lowerMsg.includes('mask')) {
      reply = `Recommended mask: ${advice.mask}.`;
    } else if (lowerMsg.includes('workout') || lowerMsg.includes('exercise')) {
      reply = `Workout suggestion: ${advice.workout}.`;
    } else if (lowerMsg.includes('aqi')) {
      reply = `Current AQI is ${latest.aqi}, which is ${advice.risk}.`;
    } else {
      reply = `Current AQI is ${latest.aqi} (${advice.risk}). ${advice.tips[0]}`;
    }
    successResponse(res, { reply });
  } catch (err) {
    errorResponse(res, err.message);
  }
};