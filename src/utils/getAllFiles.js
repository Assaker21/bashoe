const fs = require("fs");

const dirPath = "./src/uploads";

function getAllFiles() {
  return fs.readdirSync(dirPath).map((url) => ({ url }));
}

module.exports = getAllFiles;
