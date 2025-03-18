const prisma = require("../utils/prisma");

async function createOrder(query, data) {
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
      coupon: data.info.coupon,
      info: data.cart,
      shippingFee: data.info.paymentMethod.toLowerCase().includes("whish")
        ? 0
        : 4,
      paymentMethod: data.info.paymentMethod,
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
  return await prisma.order.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      id: "desc",
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
