const CalculatorCategory = require('../models/CalculatorCategory');
const Calculator = require('../models/Calculator');
const CalculatorResult = require('../models/CalculatorResult');

// ================= CALCULATOR CATEGORIES =================

// Admin: Add Category
exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await CalculatorCategory.create({ name, description });
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CalculatorCategory.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CalculatorCategory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Categories (Public)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CalculatorCategory.find({ isActive: true });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CALCULATORS =================

// Admin: Add Calculator
exports.addCalculator = async (req, res) => {
  try {
    const calculator = await Calculator.create(req.body);
    res.status(201).json({ message: "Calculator added", calculator });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update Calculator
exports.updateCalculator = async (req, res) => {
  try {
    const { id } = req.params;
    const calculator = await Calculator.findByIdAndUpdate(id, req.body, { new: true });
    if (!calculator) return res.status(404).json({ message: "Calculator not found" });
    res.json({ message: "Calculator updated", calculator });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Delete Calculator
exports.deleteCalculator = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Calculator.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Calculator not found" });
    res.json({ message: "Calculator deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Calculators by Category (Public)
exports.getCalculatorsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const calculators = await Calculator.find({ category: categoryId, isActive: true });
    res.json(calculators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CALCULATOR RESULTS =================

// User: Submit calculation
exports.submitResult = async (req, res) => {
  try {
    const { calculatorId, inputs, result } = req.body;
    const newResult = await CalculatorResult.create({
      calculator: calculatorId,
      user: req.user.id,
      inputs,
      result
    });
    res.status(201).json({ message: "Result saved", newResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User: Get own results
exports.getUserResults = async (req, res) => {
  try {
    const results = await CalculatorResult.find({ user: req.user.id })
      .populate('calculator', 'name description');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Get all results
exports.getAllResults = async (req, res) => {
  try {
    const results = await CalculatorResult.find()
      .populate('user', 'name email')
      .populate('calculator', 'name category');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
