import Init from "../models/init.model.js";

export const createInit = async (req, res) => {
  try {
    const newInit = new Init({
      shippingFee: 4,
      cats: ["Adidas", "Nike", "Erke", "Puma", "Under Armour"],
    });
    await newInit.save();
    res.status(500).send("Init saved successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const updateInit = async (req, res) => {
  try {
    await Init.findByIdAndUpdate(req.body._id, { ...req.body });
    res.status(200).send("Init saved successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const init = async (req, res) => {
  try {
    const value = await Init.findOne();
    res.status(200).json({
      shippingFee: value.shippingFee,
      cats: value.cats,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

function waiter(millisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, millisec);
  });
}
