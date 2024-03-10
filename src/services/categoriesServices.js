import { get, post, remove } from "./basicServices";

function getCategories() {
  return get("categories", null, null, false);
}

function upsertCategory(payload) {
  return post("categories", null, payload);
}

function removeCategory(query) {
  return remove("categories", query);
}

function updateShippingFee(payload) {
  return post("shippingFee", payload);
}

export default {
  getCategories,
  upsertCategory,
  removeCategory,
  updateShippingFee,
};
