const rateLimit = require('express-rate-limit');
const { globalLimiter, authLimiter } = require('../config/rateLimit');

module.exports = { globalLimiter, authLimiter };