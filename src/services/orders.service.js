const prisma = require("../utils/prisma");

async function createOrder(query, data) {
  console.log("Data: ", data);
  await prisma.order.create({
    data: {
      address: {
        create: {
          city: data.info.city,
          countryId: 1,
          address: data.info.address,
        },
      },
      user: {
        create: {
          firstName: data.info.firstName,
          lastName: data.info.lastName,
          email: data.info.email,
          phoneNumber: data.info.phoneNumber,
        },
      },
      orderStatus: {
        connect: {
          id: 1,
        },
      },
      orderItems: {
        create: data.cart.map((i) => ({
          itemId: i.item.id,
          quantity: i.quantity,
          itemVariantId: i.variant.id,
        })),
      },
    },
  });
  return "Done";
}

module.exports = {
  createOrder,
};
