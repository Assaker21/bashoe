const express = require("express");
const router = express.Router();

const {
  getVariantGroups,
  getVariantGroup,
  updateVariantGroup,
  updateVariant,
  updateCustomVariant,
  createVariantGroup,
  createVariant,
  removeVariantGroup,
  removeVariant,
} = require("../controllers/variants.controller.js");

router.get("/group", getVariantGroups);
router.get("/single", getVariantGroup);

router.put("/group", updateVariantGroup);
router.put("/single", updateVariant);
router.put("/custom", updateCustomVariant);

router.post("/group", createVariantGroup);
router.post("/single", createVariant);

router.delete("/group", removeVariantGroup);
router.delete("/single", removeVariant);

module.exports = router;
