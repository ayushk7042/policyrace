const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Policy = require('../models/Policy');


router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.post('/forgot-password', authCtrl.sendOtp);
router.post('/reset-password', authCtrl.verifyOtpAndReset);
router.get('/me', protect, authCtrl.getProfile);




module.exports = router;
