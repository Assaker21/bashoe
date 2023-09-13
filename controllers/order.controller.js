import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    await waiter(500);

    const cart = req.body.cart;
    const items = [];

    for (var i = 0; i < cart.length; i++) {
      var found = false;
      for (var j = 0; j < items.length; j++) {
        if (items[j].id == cart[i]._id) {
          found = true;
          items[j].variants.push({
            size: cart[i].size,
            quantity: cart[i].quantity
          });

          break;
        }
      }

      if (!found) {
        items.push({
          id: cart[i]._id,
          name: cart[i].name,
          desc: cart[i].desc,
          img: cart[i].img,
          price: cart[i].price,
          sizes: cart[i].sizes,
          cat: cart[i].cat,
          brand: cart[i].brand,
          variants: [
            {
              size: cart[i].size,
              quantity: cart[i].quantity
            }
          ]
        });
      }
    }

    const newOrder = new Order({
      items: items,
      client: req.body.client
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const getOrders = async (req, res) => {
  try {
    var orders;
    if (req.query.done) {
      orders = await Order.find({ done: req.query.done == "done" });
    } else {
      orders = await Order.find();
    }
    res.status(200).send(orders);
    console.log(orders);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const finishOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.body._id);
    order.done = true;
    await Order.findByIdAndUpdate(req.body._id, order);

    const orders = await Order.find();

    res.status(200).send(orders);
    console.log(order);
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
