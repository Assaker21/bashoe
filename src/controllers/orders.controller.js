const ordersServices = require("../services/orders.service");

async function createOrder(req, res) {
  try {
    const result = await ordersServices.createOrder(null, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = {
  createOrder,
};
