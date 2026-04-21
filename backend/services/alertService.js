const nodemailer = require('nodemailer');
const User = require('../models/User');
const aqiService = require('./aqiService');
const mlService = require('./mlService');
require('dotenv').config();

const sendHighRiskAlerts = async () => {
  try {
    // 1. Get the latest environmental data
    const current = await aqiService.getLatestAQI();
    if (!current) throw new Error("No current AQI data found to analyze.");

    // 2. Get the AI Prediction
    const features = {
      pm25: current.pm25 || 0, pm10: current.pm10 || 0, no2: current.no2 || 0,
      so2: current.so2 || 0, co: current.co || 0, o3: current.o3 || 0,
      temp: current.temperature || 25, humidity: current.humidity || 50, wind: current.wind || 5
    };
    const prediction = await mlService.getPrediction(features);
    const predictedAQI = prediction.predicted_aqi;

    // 3. Check if it crosses our danger threshold (Default: 150)
    const threshold = process.env.ALERT_THRESHOLD || 150;
    if (predictedAQI < threshold) {
      return { success: true, message: `AQI is safe (${predictedAQI}). No alerts sent.` };
    }

    // 4. Generate the 3-Day Forecast (matching your dashboard logic)
    const forecast = [
      { date: 'Tomorrow', aqi: predictedAQI },
      { date: 'Day 3', aqi: Math.round(predictedAQI * 1.05) },
      { date: 'Day 4', aqi: Math.round(predictedAQI * 0.95) }
    ];

    // 5. Set up the Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 6. Get all registered users from the database
    const users = await User.find().select('email name');
    if (users.length === 0) return { success: true, message: "No users to alert." };

    // 7. Extract ML Recommendations
    let precautionsList = '';
    const tips = Array.isArray(prediction.recommendations) 
      ? prediction.recommendations 
      : ["Stay indoors and keep windows closed.", "Use a HEPA air purifier.", "Wear an N95 mask if you must go outside."];
    
    tips.forEach(tip => {
      precautionsList += `<li style="margin-bottom: 8px;">✅ ${tip}</li>`;
    });

    // 8. Create the HTML Email Template
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #ef4444; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">⚠️ High Health Risk Alert</h2>
          <p style="margin: 5px 0 0 0;">AirSense AI Automated Warning</p>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <h3 style="color: #0f172a; margin-top: 0;">Predicted AQI: <span style="color: #ef4444; font-size: 28px;">${predictedAQI}</span></h3>
          <p style="color: #475569; line-height: 1.6;">Our ML model has detected that air quality will reach hazardous levels in your area. Please take immediate action to protect your health.</p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #0f172a;">📅 3-Day Forecast</h4>
            <ul style="list-style: none; padding: 0; margin: 0; color: #334155;">
              <li><strong>${forecast[0].date}:</strong> AQI ${forecast[0].aqi}</li>
              <li><strong>${forecast[1].date}:</strong> AQI ${forecast[1].aqi}</li>
              <li><strong>${forecast[2].date}:</strong> AQI ${forecast[2].aqi}</li>
            </ul>
          </div>

          <h4 style="color: #0f172a; margin-bottom: 10px;">🛡️ Recommended Precautions</h4>
          <ul style="padding-left: 0; list-style: none; color: #475569; line-height: 1.5;">
            ${precautionsList}
          </ul>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px;">
            <p>Sent by AirSense AI Environmental Monitoring</p>
          </div>
        </div>
      </div>
    `;

    // 9. Send to all users (Using Promise.all for speed)
    const emailPromises = users.map(user => {
      return transporter.sendMail({
        from: `"AirSense AI" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: `⚠️ Air Quality Alert: AQI reaching ${predictedAQI}`,
        html: emailHTML.replace('User', user.name) // Personalize (optional logic)
      });
    });

    await Promise.all(emailPromises);
    
    return { success: true, message: `Alerts sent successfully to ${users.length} users.` };
  } catch (error) {
    console.error("Alert System Error:", error);
    throw error;
  }
};

module.exports = { sendHighRiskAlerts };