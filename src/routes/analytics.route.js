const express = require("express");
const router = express.Router();

const {
  createEntry,
  getEntries,
} = require("../controllers/analytics.controller.js");

router.post("/", createEntry);
router.get("/", getEntries);

module.exports = router;
