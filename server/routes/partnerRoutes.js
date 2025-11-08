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

module.exports = router;
