const fs = require("fs");
const path = require("path");

//const dirPath = "src/uploads/";
const dirPath = path.join(__dirname, "..", "..", "/uploads");

function getAllFiles() {
  return fs.readdirSync(dirPath).map((url) => ({ url }));
}

module.exports = getAllFiles;
