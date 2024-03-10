const categoriesServices = require("../services/categories.service.js");

async function getCategories(req, res) {
  try {
    const result = await categoriesServices.getCategories(null, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function upsertCategory(req, res) {
  try {
    var result;
    if (req.body.id) {
      result = await categoriesServices.updateCategory(null, req.body);
    } else {
      result = await categoriesServices.createCategory(null, req.body);
    }
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

module.exports = { getCategories, upsertCategory, removeCategory };
