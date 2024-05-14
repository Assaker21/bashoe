const paymentServices = require("../services/payments.service.js");

async function requestPayment(req, res) {
  try {
    const result = await paymentServices.requestPayment(null, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function getPaymentStatus(req, res) {
  try {
    const result = await paymentServices.getPaymentStatus(req.params, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function getBalance(req, res) {
  try {
    const result = await paymentServices.getBalance(null, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = { getBalance, requestPayment, getPaymentStatus };
