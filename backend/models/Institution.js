const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  contactEmail: String,
  contactPhone: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // main admin of institution
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Institution', institutionSchema);