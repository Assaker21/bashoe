const ordersServices = require("../services/orders.service");
const sendMail = require("../utils/mail");

async function createOrder(req, res) {
  try {
    const result = await ordersServices.createOrder(null, req.body);
    sendMail(result.user.email, "order", result);
    sendMail(process.env.ADMIN_EMAIL_1, "order", result);
    sendMail(process.env.ADMIN_EMAIL_2, "order", result);
    res.status(200).json("Done");
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function updateOrder(req, res) {
  try {
    await ordersServices.updateOrder(req.query, req.body);
    const result = await ordersServices.getOrders();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function getOrders(req, res) {
  try {
    const result = await ordersServices.getOrders();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = {
  createOrder,
  updateOrder,
  getOrders,
};
