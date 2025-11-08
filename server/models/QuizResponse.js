const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  policy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
  answers: [{
    quizId: mongoose.Schema.Types.ObjectId,
    selectedOptionIndex: Number,
    correct: Boolean
  }],
  score: Number,
  attemptedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResponse', responseSchema);
