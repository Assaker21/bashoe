const prisma = require("../utils/prisma");

async function createImages(query, data) {
  await prisma.image.createMany({
    data: data.map((file) => ({ url: file.filename })),
  });
  return await getImages();
}

async function getImages(query, data) {
  return await prisma.image.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
}

module.exports = {
  createImages,
  getImages,
};
