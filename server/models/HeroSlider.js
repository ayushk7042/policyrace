const mongoose = require("mongoose");

const heroSliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  viewPlansLink: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Admin ID
}, { timestamps: true });

module.exports = mongoose.model("HeroSlider", heroSliderSchema);
