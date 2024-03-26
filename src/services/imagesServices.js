import { uploadFiles as _uploadFiles, get } from "./basicServices";

function getImages() {
  return get("images");
}

function uploadFiles(query, files) {
  return _uploadFiles("images", query, files);
}

export default {
  getImages,
  uploadFiles,
};
