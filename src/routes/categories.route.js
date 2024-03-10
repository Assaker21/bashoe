const express = require("express");
const router = express.Router();

const {
  getCategories,
  upsertCategory,
  removeCategory,
} = require("../controllers/categories.controller.js");

router.get("/", getCategories);
router.post("/", upsertCategory);
router.delete("/", removeCategory);

module.exports = router;
