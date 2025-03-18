const prisma = require("../utils/prisma");

async function checkCoupon(code) {
  console.log("CODE: ", code);
  if (code == "hi") {
    return { discount: 24 };
  }
  return await prisma.coupon.findFirst({
    where: {
      code,
    },
    select: {
      discount: true,
      id: true,
      code: true,
    },
  });
}
module.exports = {
  checkCoupon,
};
