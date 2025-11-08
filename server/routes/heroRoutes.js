// const express = require("express");
// const router = express.Router();
// const { protect, adminOnly } = require("../middleware/authMiddleware");
// const { createSlider, getAllSliders, addReview, getAllReviews } = require("../controllers/heroController");

// // HERO SLIDER
// router.get("/sliders", getAllSliders);
// router.post("/sliders", protect, adminOnly, createSlider);

// // REVIEWS
// router.post("/reviews", protect, addReview);
// router.get("/reviews", getAllReviews);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { adminProtect } = require("../middleware/adminMiddleware");
const { createSlider,deleteSlider, getAllSliders, addReview, getAllReviews } = require("../controllers/heroController");

// ✅ HERO SLIDER (Admin protected)

router.get("/", getAllSliders); // <
router.get("/sliders", getAllSliders);
router.post("/sliders", adminProtect, createSlider);
router.delete("/sliders/:id", adminProtect, deleteSlider);

// ✅ REVIEWS (User protected)
const { protect } = require("../middleware/authMiddleware");
router.post("/reviews", protect, addReview);
router.get("/reviews", getAllReviews);

module.exports = router;
