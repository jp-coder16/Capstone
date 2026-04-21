const connectDB = require('./config/db');
const { PORT } = require('./config/env');

// Connect to MongoDB BEFORE starting the app
connectDB();

const app = require('./app');

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle graceful shutdown for standard signals
process.on('SIGINT', () => {
  server.close(() => {
    console.log('🛑 Server closed gracefully');
    process.exit(0);
  });
});

// Handle unhandled promise rejections (prevents unexpected crashing)
process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});