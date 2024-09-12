const prisma = require("../utils/prisma");

async function getContents(query) {
  const prismaQuery = {
    where: {
      isActive: true,
    },
    select: {
      id: true,
      header: true,
      description: true,
      data: true,
      location: true,
      type: true,
      dataSelection: true,
      sequenceNumber: true,
    },
    orderBy: {
      sequenceNumber: "asc",
    },
  };

  if (query.location) {
    prismaQuery.where.location = query.location;
  }

  const contents = await prisma.content.findMany(prismaQuery);

  /*const itemIds = [];
  contents.forEach((content) => {
    if (content.type == "List of items" && content?.data) {
      content.data.map((id) => {
        itemIds.push(id);
      });
    }
  });

  if (itemIds.length > 0) {
    const items = await prisma.item.findMany({
      where: {
        id: {
          in: itemIds,
        },
      },
    });

    contents.forEach((content, index) => {
      if (content.type == "List of items" && content?.data) {
        contents[index].data = content.data.map((id) =>
          items.find((item) => item.id == id)
        );
      }
    });
  }*/

  return contents;
}

async function createContent(query, data) {
  return await prisma.content.create({
    data,
  });
}

async function updateContent(query, data) {
  return await prisma.content.update({
    where: {
      id: Number(query.id),
    },
    data,
  });
}

async function removeContent(query) {
  return await prisma.content.update({
    where: {
      id: Number(query.id),
    },
    data: { isActive: false },
  });
}

module.exports = { getContents, createContent, updateContent, removeContent };
