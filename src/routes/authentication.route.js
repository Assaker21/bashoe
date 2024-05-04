const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  if (
    req?.body.username === "hoophouseadmin" &&
    req?.body.password === "hoophouseadmin_page_2316"
  ) {
    res.status(200).send("Welcome.");
  } else res.status(500).send("No.");
});

module.exports = router;
