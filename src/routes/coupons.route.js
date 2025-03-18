const express = require("express");
const router = express.Router();

const { checkCoupon } = require("../controllers/coupons.controller");

router.get("/:coupon", checkCoupon);

module.exports = router;
