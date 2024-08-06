import { get, post, remove, put, uploadFiles } from "./_api";

async function findMany(query, cancelToken) {
  return get("images", query, null, cancelToken);
}

async function findSingle(query, cancelToken) {
  return get(`images`, query, null, cancelToken);
}

async function createSingle(payload) {
  return post("images", null, payload);
}

async function updateSingle(query, payload) {
  return put(`images`, query, payload);
}

async function deleteSingle(query) {
  return remove(`images`, query, null);
}

async function upload(files) {
  return uploadFiles("images", null, files);
}

export default {
  findMany,
  findSingle,
  createSingle,
  updateSingle,
  deleteSingle,
  upload,
};
