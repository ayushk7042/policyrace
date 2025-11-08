const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // optional
  otp: {
    code: String,
    expiresAt: Date
  },
  // placeholders for future features: tasks, policiesApplied, checksCount
  stats: {
    tasksCompleted: { type: Number, default: 0 },
    policiesApplied: { type: Number, default: 0 },
    checksMade: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
