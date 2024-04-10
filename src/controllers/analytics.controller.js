const analyticsServices = require("../services/analytics.service.js");

async function createEntry(req, res) {
  try {
    req.body.ip = req.ip;
    const result = await analyticsServices.createEntry(null, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = { createEntry };
