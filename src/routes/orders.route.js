const express = require("express");
const router = express.Router();

const {
  createOrder,
  updateOrder,
  getOrders,
} = require("../controllers/orders.controller");

router.get("/", getOrders);
router.put("/", updateOrder);
router.post("/", createOrder);

module.exports = router;
