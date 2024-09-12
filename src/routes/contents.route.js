const express = require("express");
const router = express.Router();

const {
  getContents,
  updateContent,
  removeContent,
  createContent,
} = require("../controllers/contents.controller.js");

router.get("/", getContents);
router.post("/", createContent);
router.put("/", updateContent);
router.delete("/", removeContent);

module.exports = router;
