import Category from "../models/category.model.js";

export const updateCategories = async (req, res) => {
  try {
    await Category.deleteMany({});
    console.log(req.body);
    await Category.insertMany(req.body);
    await getCategories(req, res);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    console.log("GETTING CATEGORIES");
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};
