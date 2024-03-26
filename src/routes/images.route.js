const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware.js");

const {
  getImages,
  createImages,
} = require("../controllers/images.controller.js");

router.get("/", getImages);
router.post("/", upload.array("files", 10), createImages);

module.exports = router;
