const couponsService = require("../services/coupons.service.js");

async function checkCoupon(req, res) {
  try {
    const result = await couponsService.checkCoupon(req.params.coupon);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = { checkCoupon };
