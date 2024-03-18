import { get, post } from "./basic-services";

function getLists() {
  return get("lists", { position: "home" }, null, false);
}

export default {
  getLists,
};
