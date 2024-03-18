const listsServices = require("../services/lists.service");

async function getLists(req, res) {
  try {
    const result = await listsServices.getLists(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

async function createLists(req, res) {
  try {
    const result = await listsServices.createLists(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Internal error");
    console.log(`Error: ${error}`);
  }
}

module.exports = {
  getLists,
  createLists,
};
