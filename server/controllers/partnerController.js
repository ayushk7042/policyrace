const Partner = require("../models/Partner");

/**
 * Admin: Add Partner
 */

exports.addPartnerArticle = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const { title, subTitle, description, imageUrl, link } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const partner = await Partner.findById(partnerId);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    partner.articles.push({
      title,
      subTitle,
      description,
      imageUrl,
      link
    });

    await partner.save();
    res.status(201).json({ message: "Article added", partner });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updatePartnerArticle = async (req, res) => {
  try {
    const { partnerId, articleId } = req.params;

    const partner = await Partner.findById(partnerId);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    const article = partner.articles.id(articleId);
    if (!article) return res.status(404).json({ message: "Article not found" });

    Object.assign(article, req.body);
    await partner.save();

    res.json({ message: "Article updated", article });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deletePartnerArticle = async (req, res) => {
  try {
    const { partnerId, articleId } = req.params;

    const partner = await Partner.findById(partnerId);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    partner.articles = partner.articles.filter(
      (a) => a._id.toString() !== articleId
    );

    await partner.save();
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




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
// exports.getPartnerBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const partner = await Partner.findOne({ slug });
//     if (!partner) return res.status(404).json({ message: "Partner not found" });
//     res.json({ partner });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

exports.getPartnerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const partner = await Partner.findOne({ slug });

    if (!partner)
      return res.status(404).json({ message: "Partner not found" });

    const activeArticles = partner.articles.filter(a => a.isActive);

    res.json({
      partner: {
        ...partner.toObject(),
        articles: activeArticles
      }
    });
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
