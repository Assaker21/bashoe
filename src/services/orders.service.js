const prisma = require("../utils/prisma");

async function createOrder(query, data) {
  console.log("Data: ", data);
  return await prisma.order.create({
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
    include: {
      user: true,
      address: {
        include: {
          country: true,
        },
      },
      orderItems: {
        include: {
          item: {
            include: {
              images: true,
            },
          },
          itemVariant: true,
        },
      },
      orderStatus: true,
    },
  });
  return "Done";
}

async function getOrders(query, data) {
  console.log("GETTING ORDERS: ");
  return await prisma.order.findMany({
    where: {
      isActive: true,
    },
    include: {
      user: true,
      address: {
        include: {
          country: true,
        },
      },
      orderItems: {
        include: {
          item: {
            include: {
              images: true,
            },
          },
          itemVariant: true,
        },
      },
      orderStatus: true,
    },
  });
}

async function updateOrder(query, data) {
  console.log("UPDATE: ", query);
  await prisma.order.update({
    where: {
      id: Number(query.id),
    },
    data: {
      orderStatusId: data.orderStatusId,
    },
  });
}

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
};
