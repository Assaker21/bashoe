import { post } from "./basic-services";

function createEntry(payload) {
  return post("analytics", null, payload);
}

export default {
  createEntry,
};
