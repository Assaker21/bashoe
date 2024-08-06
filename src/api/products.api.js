import { get, post, remove, put } from "./_api";

async function findMany(query, cancelToken) {
  return get("items", query, null, cancelToken);
}

async function findSingle(query, cancelToken) {
  return get(`items`, query, null, cancelToken);
}

async function createSingle(payload) {
  return post("items", null, payload);
}

async function updateSingle(query, payload) {
  return put(`items`, query, payload);
}

async function deleteSingle(query) {
  return remove(`items`, query, null);
}

export default {
  findMany,
  findSingle,
  createSingle,
  updateSingle,
  deleteSingle,
};
