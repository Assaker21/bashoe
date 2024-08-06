import { get, post, remove, put } from "./_api";

async function findManyGroup(query, cancelToken) {
  return get("variants/group", query, null, cancelToken);
}

async function findManySingle(query, cancelToken) {
  return get("variants/single", query, null, cancelToken);
}

async function createGroup(payload) {
  return post("variants/group", null, payload);
}

async function createSingle(payload) {
  return post("variants/single", null, payload);
}

async function updateGroup(query, payload) {
  console.log("Payload: ", payload);
  return put(`variants/group`, query, payload);
}

async function updateSingle(query, payload) {
  return put(`variants/single`, query, payload);
}

async function updateSingleCustom(query, payload) {
  return put(`variants/custom`, query, payload);
}

async function deleteGroup(query) {
  return remove(`variants/group`, query, null);
}

async function deleteSingle(query) {
  return remove(`variants/single`, query, null);
}

export default {
  findManyGroup,
  findManySingle,
  createGroup,
  createSingle,
  updateGroup,
  updateSingle,
  deleteGroup,
  deleteSingle,
  updateSingleCustom,
};
