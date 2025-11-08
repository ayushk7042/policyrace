const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  addCategory, updateCategory, deleteCategory, getAllCategories,
  addCalculator, updateCalculator, deleteCalculator, getCalculatorsByCategory,
  submitResult, getUserResults, getAllResults
} = require('../controllers/calculatorController');

// ====== Categories ======
router.get('/categories', getAllCategories);
router.post('/categories', protect, adminOnly, addCategory);
router.put('/categories/:id', protect, adminOnly, updateCategory);
router.delete('/categories/:id', protect, adminOnly, deleteCategory);

// ====== Calculators ======
router.post('/', protect, adminOnly, addCalculator);
router.put('/:id', protect, adminOnly, updateCalculator);
router.delete('/:id', protect, adminOnly, deleteCalculator);
router.get('/category/:categoryId', getCalculatorsByCategory);

// ====== Results ======
router.post('/result', protect, submitResult);
router.get('/my-results', protect, getUserResults);
router.get('/all-results', protect, adminOnly, getAllResults);

module.exports = router;
