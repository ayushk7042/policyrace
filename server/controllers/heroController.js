const HeroSlider = require("../models/HeroSlider");
const Review = require("../models/Review");

// ===================== HERO SLIDER =======================

// Admin: Create Slider
exports.createSlider = async (req, res) => {
  try {
    const { title, imageUrl, viewPlansLink } = req.body;
    if (!title || !imageUrl || !viewPlansLink)
      return res.status(400).json({ message: "All fields are required" });

    const slider = await HeroSlider.create({
      title,
      imageUrl,
      viewPlansLink,
      createdBy: req.admin.id,
    });

    res.status(201).json({ message: "Slider created", slider });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Delete Slider
// controllers/heroController.js
exports.deleteSlider = async (req, res) => {
  try {
    const sliderId = req.params.id;

    // Validate MongoDB ObjectId
    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(sliderId)) {
      return res.status(400).json({ message: "Invalid slider ID" });
    }

    const slider = await HeroSlider.findById(sliderId);
    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }

    await HeroSlider.findByIdAndDelete(sliderId); // safer than remove()
    res.json({ message: "Slider deleted successfully" });
  } catch (err) {
    console.error("Delete slider error:", err);
    res.status(500).json({ message: "Server error while deleting slider" });
  }
};



// Get All Sliders (Public)
exports.getAllSliders = async (req, res) => {
  try {
    const sliders = await HeroSlider.find().sort({ createdAt: -1 });
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ===================== REVIEWS =======================

// Add Review (User)
exports.addReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    if (!comment || !rating)
      return res.status(400).json({ message: "Comment and rating required" });

    const review = await Review.create({
      user: req.user.id,
      comment,
      rating
    });

// populate user name immediately
    const populatedReview = await review.populate("user", "name email");

   

    res.status(201).json({ message: "Review added", review: populatedReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};





// Get All Reviews (Public)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
