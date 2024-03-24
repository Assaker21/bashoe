import { get, put } from "./basicServices";

function getOrders() {
  return get("orders");
}

function updateOrder(query, payload) {
  return put("orders", query, payload);
}

export default {
  getOrders,
  updateOrder,
};
