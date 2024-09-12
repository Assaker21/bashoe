import { get, post } from "./basic-services";

function getContent(query) {
  return get("contents", query, null, false);
}

export default {
  getContent,
};
