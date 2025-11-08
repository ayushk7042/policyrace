const mongoose = require('mongoose');

const appliedPriceSchema = new mongoose.Schema({
  billingCycle: String,
  price: Number,
  currency: String
}, { _id: false });

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  policy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
  appliedPriceOption: appliedPriceSchema,
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  // extra fields like userAnswers for quizzes (optional)
  quizAnswers: [{
    quizId: mongoose.Schema.Types.ObjectId,
    selectedOptionIndex: Number,
    correct: Boolean
  }]
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
