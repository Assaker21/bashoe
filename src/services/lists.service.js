const prisma = require("../utils/prisma");

async function getLists(query, data) {
  const prismaQuery = {
    where: {
      isActive: true,
    },
  };
  if (query?.position) {
    prismaQuery.where.position = query.position;
  }

  const lists = await prisma.list.findMany(prismaQuery);
  return lists;
}

async function createLists(query, data) {
  await prisma.list.deleteMany({});
  const result = await prisma.list.createMany({
    data: data,
  });
  console.log("Result: ", result);
  return await getLists();
}

module.exports = {
  getLists,
  createLists,
};
