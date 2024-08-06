const getAllFiles = require("../utils/getAllFiles");
const prisma = require("../utils/prisma");

async function createImages(query, data) {
  if (data?.length > 0) {
    await prisma.image.createMany({
      data: data.map((file) => ({ url: file.filename })),
    });
  } else {
    console.log("Create image: ", data);
    await prisma.image.create({
      data: {
        url: data.url,
        itemId: data.itemId,
      },
    });
  }
  //return await getImages();
}

async function getImages(query, data) {
  if (query.what == "all") {
    console.log("Getting all image files", getAllFiles());
    return getAllFiles();
  }

  if (query.id) {
    return await prisma.image.findUnique({
      where: {
        id: Number(query.id),
      },
      select: {
        id: true,
        url: true,
        sequenceNumber: true,
      },
    });
  } else {
    return await prisma.image.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }
}

async function updateImage(query, data) {
  return await prisma.image.update({
    where: {
      id: Number(query.id),
    },
    data: {
      ...data,
    },
  });
}

async function removeImage(query, data) {
  return await prisma.image.delete({
    where: {
      id: Number(query.id),
    },
  });
}

module.exports = {
  createImages,
  getImages,
  updateImage,
  removeImage,
};
