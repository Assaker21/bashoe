const itemsServices = require("../services/items.service.js");

async function getItems(req, res) {
  try {
    console.log("Query: ", req.query);
    const result = await itemsServices.getItems(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function createItem(req, res) {
  try {
    const result = await itemsServices.createItem(null, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function removeItem(req, res) {
  try {
    const result = await itemsServices.removeItem(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function getItemVariants(req, res) {
  try {
    const result = await itemsServices.getItemVariants(null, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function updateItem(req, res) {
  try {
    const result = await itemsServices.updateItem(null, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function upsertItemVariant(req, res) {
  try {
    var result;
    if (req.body.id) {
      result = await itemsServices.updateItemVariant(null, req.body);
    } else {
      result = await itemsServices.createItemVariant(null, req.body);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function removeItemVariant(req, res) {
  try {
    const result = await itemsServices.removeItemVariant(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function upsertItemVariantGroup(req, res) {
  try {
    var result;
    if (req.body.id) {
      result = await itemsServices.updateItemVariantGroup(null, req.body);
    } else {
      result = await itemsServices.createItemVariantGroup(null, req.body);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function removeItemVariantGroup(req, res) {
  try {
    const result = await itemsServices.removeItemVariantGroup(
      req.query,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = {
  getItems,
  createItem,
  getItemVariants,
  updateItem,
  upsertItemVariant,
  removeItemVariant,
  upsertItemVariantGroup,
  removeItemVariantGroup,
  removeItem,
};
