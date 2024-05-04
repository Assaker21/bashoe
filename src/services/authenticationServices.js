import { get, post, remove } from "./basicServices";

function authenticate(data) {
  return post("authentication", null, data, false);
}

export default {
  authenticate,
};
