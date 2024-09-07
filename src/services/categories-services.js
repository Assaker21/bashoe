import { get } from "./basic-services";

function getCategories(query) {
  return get("categories", query);
}

export default {
  getCategories,
};
