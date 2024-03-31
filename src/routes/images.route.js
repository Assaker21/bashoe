const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware.js");
const getAllFiles = require("../utils/getAllFiles.js");

const {
  getImages,
  createImages,
} = require("../controllers/images.controller.js");

router.get("/", getImages);
router.post("/", upload.array("files", 10), createImages);
router.get("/all", (req, res) => {
  res.status(200).send(getAllFiles());
});

module.exports = router;
