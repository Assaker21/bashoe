import { post, get } from "./basic-services";

function createOrder(payload) {
  return post("orders", null, payload);
}

function checkCoupon(coupon) {
  return get("coupons/" + coupon);
}

export default {
  createOrder,
  checkCoupon,
};
