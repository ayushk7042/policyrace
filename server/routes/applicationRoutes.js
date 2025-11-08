// const express = require("express");
// const router = express.Router();
// const {
//   applyPolicy,
//   getUserApplications,
//   getAllApplications,
//   updateApplicationStatus,
// } = require("../controllers/applicationController");
// const { protect, adminOnly } = require("../middleware/authMiddleware");

// // 🧾 User Routes
// router.post("/apply", protect, applyPolicy);
// router.get("/my-applications", protect, getUserApplications);

// // 🧑‍💼 Admin Routes
// router.get("/all", protect, adminOnly, getAllApplications);
// router.put("/update/:id", protect, adminOnly, updateApplicationStatus);

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  applyPolicy,
  getUserApplications,
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminMiddleware");

// 🧾 User Routes
router.post("/apply", protect, applyPolicy);
router.get("/my-applications", protect, getUserApplications);

// 🧑‍💼 Admin Routes
router.get("/all", adminProtect, getAllApplications);
router.put("/update/:id", adminProtect, updateApplicationStatus);

module.exports = router;
