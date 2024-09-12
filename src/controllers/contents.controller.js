const contentsServices = require("../services/contents.service.js");

async function getContents(req, res) {
  try {
    const result = await contentsServices.getContents(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function updateContent(req, res) {
  try {
    const result = await contentsServices.updateContent(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function createContent(req, res) {
  try {
    const result = await contentsServices.createContent(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function removeContent(req, res) {
  try {
    const result = await contentsServices.removeContent(req.query, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = {
  getContents,
  updateContent,
  createContent,
  removeContent,
};
