const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'CalculatorCategory', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String },
  parameters: [{
    name: { type: String, required: true },
    type: { type: String, required: true }, // 'number', 'select', 'date'
    options: [String], // only for select type
    required: { type: Boolean, default: true }
  }],
  formula: { type: String }, // optional JS formula to calculate result
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Calculator', calculatorSchema);
