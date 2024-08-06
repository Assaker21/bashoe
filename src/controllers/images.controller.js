const imagesServices = require("../services/images.service.js");
const getAllFiles = require("../utils/getAllFiles.js");

async function getImages(req, res) {
  try {
    const result = await imagesServices.getImages(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function createImages(req, res) {
  try {
    const result = await imagesServices.createImages(
      null,
      req.files?.length > 0 ? req.files : req.body
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function updateImage(req, res) {
  try {
    console.log("REQ: ", req.query, " - ", req.body);
    const result = await imagesServices.updateImage(req.query, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function removeImage(req, res) {
  try {
    const result = await imagesServices.removeImage(req.query, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = { getImages, createImages, updateImage, removeImage };
