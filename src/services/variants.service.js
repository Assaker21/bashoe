const prisma = require("../utils/prisma");

async function getVariantGroups(query) {
  return await prisma.itemVariantGroup.findMany({
    where: { isActive: true },
    select: {
      id: true,
      description: true,
      itemVariants: {
        where: { isActive: true },
        select: {
          _count: true,
        },
      },
    },
  });
}

async function getVariantGroup(query) {
  return await prisma.itemVariantGroup.findUnique({
    where: {
      id: Number(query.id),
    },
    select: {
      id: true,
      description: true,
      itemVariants: {
        where: { isActive: true },
        select: {
          id: true,
          description: true,
          sequenceNumber: true,
        },
        orderBy: {
          sequenceNumber: "asc",
        },
      },
    },
  });
}

async function updateVariantGroup(query, data) {
  return await prisma.itemVariantGroup.update({
    where: {
      id: Number(query.id),
    },
    data: {
      description: data.description,
    },
  });
}

async function updateVariant(query, data) {
  let allElements = await prisma.itemCustomVariant.findMany({
    where: {
      isActive: true,
      itemVariantId: Number(query.id),
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  console.log("All Elements unfiltered: ", allElements);

  allElements = allElements.filter(
    (element) =>
      element.updatedAt.toISOString() == element.createdAt.toISOString()
  );

  console.log("All Elements filtered: ", allElements);

  await prisma.itemCustomVariant.updateMany({
    where: {
      id: { in: allElements.map((element) => element.id) },
    },
    data: {
      ...data,
    },
  });

  return await prisma.itemVariant.update({
    where: {
      id: Number(query.id),
    },
    data: {
      ...data,
    },
  });
}

async function updateCustomVariant(query, data) {
  return await prisma.itemCustomVariant.update({
    where: {
      id: Number(query.id),
    },
    data: {
      ...data,
    },
  });
}

async function createVariantGroup(query, data) {
  return await prisma.itemVariantGroup.create({
    data: {
      description: data.description,
    },
  });
}

async function createVariant(query, data) {
  const allItems = await prisma.item.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
    },
  });

  const newItemVariant = await prisma.itemVariant.create({
    data: {
      itemVariantGroupId: Number(data.variantGroupId),
      description: data.description,
    },
    select: {
      id: true,
      itemVariantGroupId: true,
      description: true,
    },
  });

  const createdItemCustomVariants = allItems.map((item) => ({
    itemId: item.id,
    itemVariantGroupId: newItemVariant.itemVariantGroupId,
    itemVariantId: newItemVariant.id,
    description: newItemVariant.description,
    url: "",
    enabled: false,
  }));

  await prisma.itemCustomVariant.createMany({
    data: createdItemCustomVariants,
  });

  return newItemVariant;
}

async function removeVariantGroup(query, data) {
  return await prisma.itemVariantGroup.update({
    where: {
      id: Number(query.id),
    },
    data: {
      isActive: false,
    },
  });
}

async function removeVariant(query, data) {
  return await prisma.itemVariant.update({
    where: {
      id: Number(query.id),
    },
    data: {
      isActive: false,
    },
  });
}
module.exports = {
  getVariantGroups,
  getVariantGroup,
  updateVariantGroup,
  updateVariant,
  createVariantGroup,
  createVariant,
  removeVariantGroup,
  removeVariant,
  updateCustomVariant,
};
