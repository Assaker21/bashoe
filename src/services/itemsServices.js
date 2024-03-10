import { get, post, put, remove } from "./basicServices";

function getItems(query) {
  return get("items", query, null);
}
function createItem(payload) {
  return post("items", null, payload);
}

function updateItem(payload) {
  return put("items", null, payload);
}

function getItemVariants() {
  return get("items/variants");
}

function upsertItemVariant(payload) {
  return post("items/variants", null, payload);
}

function deleteItemVariant(query) {
  return remove("items/variants", query);
}

function upsertItemVariantGroup(payload) {
  return post("items/variantGroups", null, payload);
}

function deleteItemVariantGroup(query) {
  return remove("items/variantGroups", query);
}

export default {
  getItems,
  deleteItemVariantGroup,
  createItem,
  upsertItemVariantGroup,
  getItemVariants,
  deleteItemVariant,
  updateItem,
  upsertItemVariant,
};
