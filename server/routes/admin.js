const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { adminProtect } = require('../middleware/adminMiddleware');

const User = require('../models/User');


// admin login
router.post('/login', adminCtrl.adminLogin);

// admin protected routes
router.get('/users', adminProtect, adminCtrl.getAllUsers);

// Get all users with saved policies
router.get('/all-users-saved-policies', async (req, res) => {
  try {
    const users = await User.find()
      .select('name email savedPolicies')
      .populate('savedPolicies', 'title policyType'); // show title and type

    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
