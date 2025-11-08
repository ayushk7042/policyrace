const mongoose = require('mongoose');

const calculatorResultSchema = new mongoose.Schema({
  calculator: { type: mongoose.Schema.Types.ObjectId, ref: 'Calculator', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inputs: [{
    parameterName: String,
    value: mongoose.Schema.Types.Mixed
  }],
  result: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CalculatorResult', calculatorResultSchema);
