const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { adminProtect } = require('../middleware/adminMiddleware');

// admin login
router.post('/login', adminCtrl.adminLogin);

// admin protected routes
router.get('/users', adminProtect, adminCtrl.getAllUsers);

module.exports = router;
