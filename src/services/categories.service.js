const prisma = require("../utils/prisma");

async function getCategories(query, data) {
  return await prisma.category.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      sku: true,
      description: true,
    },
  });
}

async function createCategory(query, data) {
  await prisma.category.create({
    data: {
      description: data.description,
      sku: data.sku,
    },
  });
  return await getCategories();
}

async function updateCategory(query, data) {
  await prisma.category.update({
    where: {
      id: data.id,
    },
    data: {
      description: data.description,
      sku: data.sku,
    },
  });
  return await getCategories();
}

async function removeCategory(query, data) {
  await prisma.category.update({
    where: {
      id: Number(query.id),
    },
    data: {
      isActive: false,
    },
  });

  return await getCategories();
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  removeCategory,
};
