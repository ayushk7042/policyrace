// const PolicyApplication = require("../models/PolicyApplication");
// const User = require("../models/User");
// const Policy = require("../models/Policy");

// // ✅ Apply Policy (User)
// exports.applyPolicy = async (req, res) => {
//   try {
//     const { policyId } = req.body;
//     const userId = req.user.id; // middleware se user ID aayegi

//     const alreadyApplied = await PolicyApplication.findOne({
//       user: userId,
//       policy: policyId,
//     });

//     if (alreadyApplied) {
//       return res.status(400).json({ message: "You have already applied for this policy" });
//     }

//     const application = new PolicyApplication({
//       user: userId,
//       policy: policyId,
//     });

//     await application.save();

//     res.status(201).json({ message: "Policy applied successfully", application });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ User Dashboard — Get All Applied Policies by User
// exports.getUserApplications = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const applications = await PolicyApplication.find({ user: userId }).populate("policy");
//     res.json(applications);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching user applications" });
//   }
// };

// // ✅ Admin — View All User Applications
// exports.getAllApplications = async (req, res) => {
//   try {
//     const applications = await PolicyApplication.find()
//       .populate("user", "name email")
//       .populate("policy", "title price");
//     res.json(applications);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching all applications" });
//   }
// };

// // ✅ Admin — Update Application Status
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, message } = req.body;

//     const application = await PolicyApplication.findByIdAndUpdate(
//       id,
//       { status, message },
//       { new: true }
//     );

//     if (!application) return res.status(404).json({ message: "Application not found" });

//     res.json({ message: "Status updated", application });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating status" });
//   }
// };
// controllers/applicationController.js
const PolicyApplication = require("../models/PolicyApplication");
const User = require("../models/User");
const Policy = require("../models/Policy");

// ✅ User Apply Policy
exports.applyPolicy = async (req, res) => {
  try {
    const { policyId } = req.body;
    const userId = req.user.id;

    const alreadyApplied = await PolicyApplication.findOne({
      user: userId,
      policy: policyId,
    });

    if (alreadyApplied)
      return res.status(400).json({ message: "You already applied for this policy" });

    const application = new PolicyApplication({ user: userId, policy: policyId });
    await application.save();

    res.status(201).json({ message: "Policy applied successfully", application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ User Dashboard - Get All Applied Policies
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await PolicyApplication.find({ user: userId }).populate("policy");
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user applications" });
  }
};

// ✅ Admin Dashboard - Get All Applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await PolicyApplication.find()
      .populate("user", "name email")
      .populate("policy", "title priceOptions");
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// ✅ Admin - Update Application Status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, message } = req.body;

    const application = await PolicyApplication.findById(id);
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    application.status = status;
    application.message = message || "";
    await application.save();

    // ✅ Auto update user's policy count if approved
    if (status === "Approved") {
      await User.findByIdAndUpdate(application.user, {
        $inc: { "stats.policiesApplied": 1 },
      });
    }

    const updated = await PolicyApplication.findById(id)
      .populate("user", "name email")
      .populate("policy", "title");

    res.json({ message: "Status updated successfully", application: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating application" });
  }
};
