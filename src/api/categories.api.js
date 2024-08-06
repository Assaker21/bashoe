import { get, post, remove, put } from "./_api";

async function findMany(query, cancelToken) {
  return get("categories", query, null, cancelToken);
}

async function createSingle(payload) {
  return post("categories", null, payload);
}

async function updateSingle(query, payload) {
  return put(`categories`, query, payload);
}

async function deleteSingle(query) {
  return remove(`categories`, query, null);
}

export default {
  findMany,
  createSingle,
  updateSingle,
  deleteSingle,
};
