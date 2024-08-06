const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/categories.controller.js");

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/", updateCategory);
router.delete("/", removeCategory);

module.exports = router;
