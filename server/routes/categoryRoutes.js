const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/categoryController');
const { adminProtect } = require('../middleware/adminMiddleware');

// ---------- ADMIN ROUTES ----------
router.post('/', adminProtect, categoryCtrl.createCategory);
router.put('/:id', adminProtect, categoryCtrl.updateCategory);
router.delete('/:id', adminProtect, categoryCtrl.deleteCategory);

// ---------- PUBLIC / USER ROUTES ----------
router.get('/', categoryCtrl.getAllCategories);
router.get('/:id', categoryCtrl.getCategoryById);
module.exports = router;
