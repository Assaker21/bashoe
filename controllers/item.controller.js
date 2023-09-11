import Item from "../models/item.model.js";

export const createItem = async (req, res) => {
  if (req.body.cat) req.body.cat = req.body.cat.toUpperCase();
  const newItem = new Item({
    ...req.body
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

  const filters = {
    ...(q.cat && { cat: q.cat.toUpperCase() }),
    ...(q.search && { name: { $regex: q.search, $options: "i" } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max })
      }
    })
  };

  await waiter(500);

  try {
    var items;
    if (q.id) items = await Item.findById(q.id);
    else items = await Item.find(filters);
    res.status(200).send(items);
    console.log(items + "");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const editItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) return res.status(500).send("Item not found!");

    const newItem = {
      ...req.body,
      item
    };

    const savedItem = await Item.findByIdAndUpdate(req.params.id, newItem);

    res.send(201).json(savedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getBrands = async (req, res) => {
  res.status(200).send(["Adidas", "Nike", "Erke", "Puma", "Under armour"]);
};

function waiter(millisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, millisec);
  });
}
