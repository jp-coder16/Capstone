const AQI = require('../models/AQI');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

exports.uploadData = async (req, res) => {
  try {
    if (!req.file) return errorResponse(res, 'No file uploaded', 400);
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Assume CSV columns: date,pm25,pm10,no2,so2,co,o3,temp,humidity,wind,aqi
        for (let row of results) {
          await AQI.updateOne(
            { date: new Date(row.date) },
            { $set: { ...row, aqi: Number(row.aqi) } },
            { upsert: true }
          );
        }
        fs.unlinkSync(req.file.path);
        successResponse(res, { count: results.length }, 'Data uploaded successfully');
      });
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.deleteData = async (req, res) => {
  try {
    const { date } = req.query;
    if (date) {
      await AQI.deleteOne({ date: new Date(date) });
    } else {
      await AQI.deleteMany({});
    }
    successResponse(res, null, 'Data deleted');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    successResponse(res, users);
  } catch (err) {
    errorResponse(res, err.message);
  }
};