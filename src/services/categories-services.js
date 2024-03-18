import { get } from "./basic-services";

function getCategories() {
  return get("categories");
}

export default {
  getCategories,
};
