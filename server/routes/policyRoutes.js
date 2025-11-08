const express = require('express');
const router = express.Router();
const policyCtrl = require('../controllers/policyController');
const { adminProtect } = require('../middleware/adminMiddleware');
const { protect } = require('../middleware/authMiddleware');

// Public: list (optionally by category)
router.get('/', policyCtrl.getPolicies);

// Public: single policy
router.get('/:id', policyCtrl.getPolicyById);

// Admin routes
router.post('/', adminProtect, policyCtrl.createPolicy);
router.put('/:id', adminProtect, policyCtrl.updatePolicy);
router.delete('/:id', adminProtect, policyCtrl.deletePolicy);

// User actions
router.post('/:id/apply', protect, policyCtrl.applyPolicy); // user applies for policy (policyId can be in body or use :id)
router.get('/admin/applications', adminProtect, policyCtrl.getApplications);

module.exports = router;
