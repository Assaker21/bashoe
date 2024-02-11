import Item from "../models/item.model.js";
import Init from "../models/init.model.js";

export const createItem = async (req, res) => {
  if (req.body.cat) req.body.cat = req.body.cat.toUpperCase();
  const newItem = new Item({
    ...req.body,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getItems = async (req, res) => {
  const q = req.query;

  console.log("Getting items.");

  const filters = {
    ...(q.cat && { cat: q.cat }),
    ...(q.search && { name: { $regex: q.search, $options: "i" } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
  };

  try {
    var items;
    if (q.id) items = await Item.findById(q.id);
    else items = await Item.find(filters);
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteItem = async (req, res) => {
  try {
    console.log(req.params);
    await Item.findByIdAndDelete(req.params.id);

    res.status(201).json({});
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const editItem = async (req, res) => {
  try {
    const item = await Item.findById(req.body._id);
    if (item == null) return res.status(500).send("Item not found!");

    const newItem = {
      ...req.body,
      item,
    };

    const savedItem = await Item.findByIdAndUpdate(req.body._id, newItem);

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const getBrands = async (req, res) => {
  const init = await Init.findOne();
  res.status(200).send(init.cats);
};

function waiter(millisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, millisec);
  });
}
