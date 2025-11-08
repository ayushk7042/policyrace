// const Policy = require('../models/Policy');
// const Application = require('../models/Application');
// const QuizResponse = require('../models/QuizResponse');
// const mongoose = require('mongoose');

// /**
//  * Admin: create policy
//  */
// exports.createPolicy = async (req, res) => {
//   try {
//     const data = req.body;
//     // expected: title, category, imageUrl, shortDescription, lifeCover, coverTillAge, claimSettlement,
//     // refundOfPremium (bool), freeAddOns[], planDetail{}, addOnBenefits[], advantages[], quizzes[], priceOptions[]
//     data.createdBy = req.admin.id;
//     const policy = await Policy.create(data);
//     res.status(201).json({ message: 'Policy created', policy });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// /**
//  * Admin: update policy
//  */
// exports.updatePolicy = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     const updated = await Policy.findByIdAndUpdate(id, data, { new: true });
//     if (!updated) return res.status(404).json({ message: 'Policy not found' });
//     res.json({ message: 'Policy updated', policy: updated });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /**
//  * Admin: delete
//  */
// exports.deletePolicy = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const removed = await Policy.findByIdAndDelete(id);
//     if (!removed) return res.status(404).json({ message: 'Policy not found' });
//     res.json({ message: 'Policy deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /**
//  * Public: get policies by category or all
//  * Query: ?category=<categoryId>
//  */
// exports.getPolicies = async (req, res) => {
//   try {
//     const { category } = req.query;
//     const filter = {};
//     if (category && mongoose.Types.ObjectId.isValid(category)) filter.category = category;

//     // For listing, we don't want to send quizzes.correctOptionIndex
//     const policies = await Policy.find(filter)
//       .select('-quizzes.correctOptionIndex')
//       .sort({ createdAt: -1 })
//       .populate('category', 'name iconUrl');

//     res.json({ policies });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /**
//  * Public: get single policy (full detail)
//  * This endpoint will still hide correctOptionIndex by default to prevent cheating.
//  */
// exports.getPolicyById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const policy = await Policy.findById(id).populate('category', 'name iconUrl');
//     if (!policy) return res.status(404).json({ message: 'Policy not found' });

//     // remove correctOptionIndex before sending
//     const obj = policy.toObject();
//     if (obj.quizzes && obj.quizzes.length) {
//       obj.quizzes = obj.quizzes.map(q => {
//         const { correctOptionIndex, ...rest } = q;
//         return rest;
//       });
//     }

//     res.json({ policy: obj });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /**
//  * User: apply for a policy -> create Application
//  * Body: { policyId, selectedPriceOption: { billingCycle, price, currency }, quizAnswers: [{ quizId, selectedOptionIndex }] }
//  */
// exports.applyPolicy = async (req, res) => {
//   try {
//     const { policyId, selectedPriceOption, quizAnswers } = req.body;
//     const userId = req.user.id;

//     if (!policyId) return res.status(400).json({ message: 'policyId required' });

//     const policy = await Policy.findById(policyId);
//     if (!policy) return res.status(404).json({ message: 'Policy not found' });

//     // Validate selectedPriceOption (optional)
//     let appliedPrice = selectedPriceOption || null;
//     if (appliedPrice) {
//       // ensure billingCycle exists among policy priceOptions (best-effort)
//       const found = policy.priceOptions.find(po => po.billingCycle === appliedPrice.billingCycle && po.price === appliedPrice.price);
//       if (!found) {
//         // allow custom but warn
//         // return res.status(400).json({ message: 'Selected price option invalid' });
//       }
//     }

//     // evaluate quiz answers if present
//     let evaluatedAnswers = [];
//     let score = 0;
//     if (Array.isArray(quizAnswers) && quizAnswers.length > 0) {
//       for (const ans of quizAnswers) {
//         const q = policy.quizzes.id(ans.quizId);
//         if (!q) continue;
//         const correct = (q.correctOptionIndex !== undefined) ? (q.correctOptionIndex === ans.selectedOptionIndex) : false;
//         if (correct) score++;
//         evaluatedAnswers.push({
//           quizId: ans.quizId,
//           selectedOptionIndex: ans.selectedOptionIndex,
//           correct
//         });
//       }
//     }

//     // create application
//     const appDoc = await Application.create({
//       user: userId,
//       policy: policyId,
//       appliedPriceOption: appliedPrice,
//       quizAnswers: evaluatedAnswers
//     });

//     // store quiz response separately too (optional)
//     await QuizResponse.create({
//       user: userId,
//       policy: policyId,
//       answers: evaluatedAnswers,
//       score
//     });

//     res.status(201).json({ message: 'Applied successfully', application: appDoc, quizScore: score });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// /**
//  * Admin: get all applications (with user & policy populated)
//  */
// exports.getApplications = async (req, res) => {
//   try {
//     const apps = await Application.find()
//       .populate('user', 'name email')
//       .populate('policy', 'title category')
//       .sort({ createdAt: -1 });
//     res.json({ applications: apps });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };





const Policy = require('../models/Policy');
const Application = require('../models/Application');
const QuizResponse = require('../models/QuizResponse');
const mongoose = require('mongoose');

/**
 * Admin: create policy
 */
exports.createPolicy = async (req, res) => {
  try {
    const data = req.body;
    // Add createdBy field
    data.createdBy = req.admin.id;

    // ✅ Ensure new fields exist if provided
    if (!data.policyType) data.policyType = 'Life'; // default
    // carDetails, healthDetails, travelDetails, homeDetails can be passed as-is

    const policy = await Policy.create(data);
    res.status(201).json({ message: 'Policy created', policy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Admin: update policy
 */
exports.updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await Policy.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return res.status(404).json({ message: 'Policy not found' });
    res.json({ message: 'Policy updated', policy: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Admin: delete policy
 */
exports.deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Policy.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Policy not found' });
    res.json({ message: 'Policy deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Public: get policies by category or all
 * Query: ?category=<categoryId>
 */
exports.getPolicies = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && mongoose.Types.ObjectId.isValid(category)) filter.category = category;

    // For listing, hide quizzes.correctOptionIndex
    const policies = await Policy.find(filter)
      .select('-quizzes.correctOptionIndex')
      .sort({ createdAt: -1 })
      .populate('category', 'name iconUrl');

    res.json({ policies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Public: get single policy (full detail)
 */
exports.getPolicyById = async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await Policy.findById(id).populate('category', 'name iconUrl');
    if (!policy) return res.status(404).json({ message: 'Policy not found' });

    // remove correctOptionIndex before sending
    const obj = policy.toObject();
    if (obj.quizzes && obj.quizzes.length) {
      obj.quizzes = obj.quizzes.map(q => {
        const { correctOptionIndex, ...rest } = q;
        return rest;
      });
    }

    res.json({ policy: obj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * User: apply for a policy
 * Body: { policyId, selectedPriceOption: { billingCycle, price, currency }, quizAnswers: [{ quizId, selectedOptionIndex }] }
 */
exports.applyPolicy = async (req, res) => {
  try {
    const { policyId, selectedPriceOption, quizAnswers } = req.body;
    const userId = req.user.id;

    if (!policyId) return res.status(400).json({ message: 'policyId required' });

    const policy = await Policy.findById(policyId);
    if (!policy) return res.status(404).json({ message: 'Policy not found' });

    // Validate selectedPriceOption
    let appliedPrice = selectedPriceOption || null;
    if (appliedPrice) {
      const found = policy.priceOptions.find(po => po.billingCycle === appliedPrice.billingCycle && po.price === appliedPrice.price);
      if (!found) {
        // allow custom but warn (existing behavior)
      }
    }

    // Evaluate quiz answers if present
    let evaluatedAnswers = [];
    let score = 0;
    if (Array.isArray(quizAnswers) && quizAnswers.length > 0) {
      for (const ans of quizAnswers) {
        const q = policy.quizzes.id(ans.quizId);
        if (!q) continue;
        const correct = (q.correctOptionIndex !== undefined) ? (q.correctOptionIndex === ans.selectedOptionIndex) : false;
        if (correct) score++;
        evaluatedAnswers.push({
          quizId: ans.quizId,
          selectedOptionIndex: ans.selectedOptionIndex,
          correct
        });
      }
    }

    // create application
    const appDoc = await Application.create({
      user: userId,
      policy: policyId,
      appliedPriceOption: appliedPrice,
      quizAnswers: evaluatedAnswers
    });

    // store quiz response separately too (optional)
    await QuizResponse.create({
      user: userId,
      policy: policyId,
      answers: evaluatedAnswers,
      score
    });

    res.status(201).json({ message: 'Applied successfully', application: appDoc, quizScore: score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Admin: get all applications
 */
exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.find()
      .populate('user', 'name email')
      .populate('policy', 'title category policyType')
      .sort({ createdAt: -1 });
    res.json({ applications: apps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
