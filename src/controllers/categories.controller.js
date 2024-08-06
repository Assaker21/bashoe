const categoriesServices = require("../services/categories.service.js");

async function getCategories(req, res) {
  try {
    const result = await categoriesServices.getCategories(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function updateCategory(req, res) {
  try {
    const result = await categoriesServices.updateCategory(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function createCategory(req, res) {
  try {
    const result = await categoriesServices.createCategory(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function removeCategory(req, res) {
  try {
    const result = await categoriesServices.removeCategory(req.query, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = {
  getCategories,
  updateCategory,
  createCategory,
  removeCategory,
};
