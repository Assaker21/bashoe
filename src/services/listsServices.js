import { get, post } from "./basicServices";

function getLists() {
  return get("lists", { position: "home" }, null, false);
}

function updateLists(payload) {
  return post("lists", null, payload);
}

export default {
  getLists,
  updateLists,
};
