const express = require("express");
const router = express.Router();

const {
  getItems,
  createItem,
  getItemVariants,
  updateItem,
  upsertItemVariant,
  removeItemVariant,
  upsertItemVariantGroup,
  removeItemVariantGroup,
} = require("../controllers/items.controller.js");

router.get("/", getItems);
router.get("/variants", getItemVariants);

router.post("/", createItem);
router.post("/variants", upsertItemVariant);
router.post("/variantGroups", upsertItemVariantGroup);

router.delete("/variants", removeItemVariant);
router.delete("/variantGroups", removeItemVariantGroup);

router.put("/", updateItem);

module.exports = router;
