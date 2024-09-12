import { get, post, remove, put } from "./_api";

async function findMany(query, cancelToken) {
  return get("contents", query, null, cancelToken);
}

async function createSingle(payload) {
  return post("contents", null, payload);
}

async function updateSingle(query, payload) {
  return put(`contents`, query, payload);
}

async function deleteSingle(query) {
  return remove(`contents`, query, null);
}

export default {
  findMany,
  createSingle,
  updateSingle,
  deleteSingle,
};
