const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  }
});

// 🔐 Hash password before save
UserSchema.pre('save', async function () {

  if (!this.isModified('password')) return;

  const salt = await require('bcryptjs').genSalt(10);
  this.password = await require('bcryptjs').hash(this.password, salt);

});

// 🔑 Compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);