const express = require("express");
const router = express.Router();
const partnerCtrl = require("../controllers/partnerController");
const { adminProtect } = require("../middleware/adminMiddleware");

// Public
router.get("/", partnerCtrl.getPartners);
router.get("/:slug", partnerCtrl.getPartnerBySlug);

// Admin
router.post("/", adminProtect, partnerCtrl.createPartner);
router.delete("/:id", adminProtect, partnerCtrl.deletePartner);



// Admin - Articles
router.post("/:partnerId/articles", adminProtect, partnerCtrl.addPartnerArticle);
router.put(
  "/:partnerId/articles/:articleId",
  adminProtect,
  partnerCtrl.updatePartnerArticle
);
router.delete(
  "/:partnerId/articles/:articleId",
  adminProtect,
  partnerCtrl.deletePartnerArticle
);

module.exports = router;
