const prisma = require("../utils/prisma");
const axios = require("axios");

async function requestPayment(query, data) {
  try {
    var response = await axios.post(
      `${process.env.WHISH_URL}/payment/whish`,
      {
        amount: data.amount,
        currency: "USD",
        invoice: data.invoice,
        externalId: data.externalId,
        successCallbackUrl: data.successCallbackUrl,
        failureCallbackUrl: data.failureCallbackUrl,
        successRedirectUrl: data.successRedirectUrl,
        failureRedirectUrl: data.failureRedirectUrl,
      },
      {
        headers: {
          channel: process.env.WHISH_CHANNEL,
          secret: process.env.WHISH_SECRET,
          websiteurl: process.env.WHISH_WEBSITEURL,
        },
      }
    );
  } catch (err) {
    console.log("Error: ", err.response.data);
    throw err;
  }
  return response.data;
}

async function getBalance(query, data) {
  const response = await axios.get(
    `${process.env.WHISH_URL}/payment/account/balance`,
    {
      headers: {
        channel: process.env.WHISH_CHANNEL,
        secret: process.env.WHISH_SECRET,
        websiteurl: process.env.WHISH_WEBSITEURL,
      },
    }
  );
  return response.data;
}

async function getPaymentStatus(query, data) {
  try {
    var response = await axios.post(
      `${process.env.WHISH_URL}/payment/whish`,
      {
        currency: "USD",
        externalId: query.externalId,
      },
      {
        headers: {
          channel: process.env.WHISH_CHANNEL,
          secret: process.env.WHISH_SECRET,
          websiteurl: process.env.WHISH_WEBSITEURL,
        },
      }
    );
  } catch (err) {
    console.log("Error: ", err.response.data);
    throw err;
  }
  return response.data;
}

module.exports = {
  requestPayment,
  getBalance,
  getPaymentStatus,
};
