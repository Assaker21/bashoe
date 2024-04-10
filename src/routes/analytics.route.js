const express = require("express");
const router = express.Router();

const { createEntry } = require("../controllers/analytics.controller.js");

router.post("/", createEntry);

module.exports = router;
