const express = require("express");
const router = express.Router();

const { getLists, createLists } = require("../controllers/lists.controller");

router.get("/", getLists);
router.post("/", createLists);

module.exports = router;
