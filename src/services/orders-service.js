import { post } from "./basic-services";

function createOrder(payload) {
  return post("orders", null, payload);
}

export default {
  createOrder,
};
