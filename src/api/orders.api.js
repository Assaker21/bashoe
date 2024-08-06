import { get, post, remove, put } from "./_api";

async function findMany(query, cancelToken) {
  return get("orders", query, null, cancelToken);
}

async function findSingle(query, cancelToken) {
  return get(`orders/${query.id}`, query, null, cancelToken);
}

async function createSingle(payload) {
  return post("orders", null, payload);
}

async function updateSingle(query, payload) {
  return put(`orders`, query, payload);
}

async function deleteSingle(query) {
  return remove(`orders/${query.id}`, query, null);
}

export default {
  findMany,
  findSingle,
  createSingle,
  updateSingle,
  deleteSingle,
};
