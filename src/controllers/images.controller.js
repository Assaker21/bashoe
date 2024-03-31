const imagesServices = require("../services/images.service.js");
const getAllFiles = require("../utils/getAllFiles.js");

async function getImages(req, res) {
  try {
    const result = getAllFiles(); //await imagesServices.getImages(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function createImages(req, res) {
  try {
    const result = getAllFiles(); //await imagesServices.createImages(null, req.files);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = { getImages, createImages };
