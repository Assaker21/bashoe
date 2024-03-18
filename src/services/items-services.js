import { get } from "./basic-services";

function getItems(query) {
  return get("items", query);
}

export default {
  getItems,
};
