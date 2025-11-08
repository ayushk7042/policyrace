const Partner = require("../models/Partner");

/**
 * Admin: Add Partner
 */
exports.createPartner = async (req, res) => {
  try {
    const { title, iconUrl } = req.body;
    if (!title || !iconUrl)
      return res.status(400).json({ message: "Title and iconUrl required" });

    const newPartner = await Partner.create({
      title,
      iconUrl,
      createdBy: req.admin.id
    });

    res.status(201).json({ message: "Partner created", partner: newPartner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Get all partners (public)
 */
exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json({ partners });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Get partner by slug (for post page)
 */
exports.getPartnerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const partner = await Partner.findOne({ slug });
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.json({ partner });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Admin delete
 */
exports.deletePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Partner.findByIdAndDelete(id);
    if (!removed)
      return res.status(404).json({ message: "Partner not found" });
    res.json({ message: "Partner deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
