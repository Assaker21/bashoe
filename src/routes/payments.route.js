const express = require("express");
const router = express.Router();

const {
  requestPayment,
  getBalance,
  getPaymentStatus,
} = require("../controllers/payments.controller.js");

router.get("/balance", getBalance);
router.post("/pay", requestPayment);
router.get("/:externalId", getPaymentStatus);

module.exports = router;
