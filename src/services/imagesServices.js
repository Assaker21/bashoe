import { uploadFiles as _uploadFiles, get } from "./basicServices";

function getImages() {
  return get("images");
}

function uploadFiles(query, files) {
  return _uploadFiles("images", query, files);
}

function downloadImage(url) {
  return url;
}

export default {
  getImages,
  uploadFiles,
  downloadImage,
};
