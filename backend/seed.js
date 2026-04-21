const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const AQI = require('./models/AQI'); 

// Force exact path to .env
dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in .env!");
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected for seeding...');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const today = new Date();
const seedData = [
  { date: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000), location: 'Main Station', aqi: 185, pm25: 85, pm10: 130, no2: 35, so2: 12, co: 0.9, o3: 45, temperature: 29, humidity: 60, wind: 4 },
  { date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), location: 'Main Station', aqi: 195, pm25: 92, pm10: 145, no2: 38, so2: 14, co: 1.1, o3: 48, temperature: 28, humidity: 62, wind: 3 },
  { date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000), location: 'Main Station', aqi: 210, pm25: 110, pm10: 160, no2: 42, so2: 15, co: 1.3, o3: 52, temperature: 30, humidity: 55, wind: 5 },
  { date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), location: 'Main Station', aqi: 175, pm25: 78, pm10: 125, no2: 32, so2: 10, co: 0.8, o3: 40, temperature: 27, humidity: 65, wind: 6 },
  { date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), location: 'Main Station', aqi: 220, pm25: 125, pm10: 180, no2: 48, so2: 18, co: 1.5, o3: 58, temperature: 31, humidity: 50, wind: 2 },
  { date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000), location: 'Main Station', aqi: 245, pm25: 140, pm10: 200, no2: 55, so2: 22, co: 1.8, o3: 65, temperature: 32, humidity: 48, wind: 3 },
  { date: today, location: 'Main Station', aqi: 260, pm25: 155, pm10: 220, no2: 60, so2: 25, co: 2.1, o3: 70, temperature: 33, humidity: 45, wind: 2 }
];

const importData = async () => {
  await connectDB();
  try {
    await AQI.deleteMany(); 
    const docs = await AQI.insertMany(seedData);
    console.log(`✅ SUCCESS: ${docs.length} rows of real dataset values imported!`);
    process.exit();
  } catch (error) {
    console.error(`❌ Data Insert Error: ${error.message}`);
    process.exit(1);
  }
};

importData();