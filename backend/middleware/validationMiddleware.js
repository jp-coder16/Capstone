const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

// Schemas
const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin', 'institution')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const aqiAddSchema = Joi.object({
  date: Joi.date().required(),
  pm25: Joi.number(),
  pm10: Joi.number(),
  no2: Joi.number(),
  so2: Joi.number(),
  co: Joi.number(),
  o3: Joi.number(),
  temp: Joi.number(),
  humidity: Joi.number(),
  wind: Joi.number(),
  aqi: Joi.number().required()
});

const alertCreateSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  severity: Joi.string().valid('low', 'medium', 'high'),
  expiresAt: Joi.date()
});

module.exports = { validate, signupSchema, loginSchema, aqiAddSchema, alertCreateSchema };