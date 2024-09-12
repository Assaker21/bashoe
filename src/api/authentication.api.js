import { post } from "./_api";

async function authenticate(query, data, cancelToken) {
  return post("authentication", query, data, cancelToken);
}

export default {
  authenticate,
};
