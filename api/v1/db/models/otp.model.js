const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  token_id: {
    type: String
  },
  user_id: {
    type: Number
  },
  otp: {
    type: String
  },
  reason: {
    type: String,
    default: null
  },
  exp_time: {
    type: Date
  }
}, {timestamps: true});

const Otp = mongoose.model('otp', otpSchema);

module.exports = Otp;
