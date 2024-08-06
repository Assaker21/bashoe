const variantsServices = require("../services/variants.service");

async function getVariantGroups(req, res) {
  try {
    const result = await variantsServices.getVariantGroups(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function getVariantGroup(req, res) {
  try {
    const result = await variantsServices.getVariantGroup(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function updateVariantGroup(req, res) {
  try {
    const result = await variantsServices.updateVariantGroup(
      req.query,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function updateVariant(req, res) {
  try {
    const result = await variantsServices.updateVariant(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function updateCustomVariant(req, res) {
  try {
    const result = await variantsServices.updateCustomVariant(
      req.query,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function createVariantGroup(req, res) {
  try {
    const result = await variantsServices.createVariantGroup(
      req.query,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function createVariant(req, res) {
  try {
    const result = await variantsServices.createVariant(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function removeVariantGroup(req, res) {
  try {
    const result = await variantsServices.removeVariantGroup(
      req.query,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function removeVariant(req, res) {
  try {
    const result = await variantsServices.removeVariant(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = {
  getVariantGroups,
  getVariantGroup,
  updateVariantGroup,
  updateVariant,
  createVariantGroup,
  createVariant,
  removeVariantGroup,
  removeVariant,
  updateCustomVariant,
};
