const prisma = require("../utils/prisma");
const compareArrays = require("../utils/compareArrays");

async function getItems(query, data) {
  const prismaQuery = {
    isActive: true,
  };

  const prismaSelect = {
    id: true,
    name: true,
    description: true,
    price: true,
    discount: true,
    imagesType: true,
    sku: true,
    categories: {
      select: {
        id: true,
        description: true,
        sku: true,
      },
    },
    images: {
      select: {
        id: true,
        url: true,
        sequenceNumber: true,
      },
      orderBy: {
        sequenceNumber: "asc",
      },
    },
    itemCustomVariants: {
      where: {
        isActive: true,
      },
      select: {
        id: true,
        description: true,
        url: true,
        enabled: true,
        sequenceNumber: true,
        itemVariantGroup: {
          select: {
            id: true,
            description: true,
          },
        },
      },
      orderBy: {
        sequenceNumber: "asc",
      },
    },
  };

  if (query.categorySku && query.categorySku !== "all") {
    prismaQuery.categories = {
      some: {
        sku: query.categorySku,
      },
    };
  } else if (query.categoryId && query.categorySku !== "all") {
    prismaQuery.categories = {
      some: {
        id: query.categoryId,
      },
    };
  }

  if (query.enabledItemCustomVariants) {
    prismaSelect.itemCustomVariants.where.enabled = true;
  }

  if (query.itemSku) {
    prismaQuery.sku = query.itemSku;
  }

  if (query.search) {
    prismaQuery.name = {
      contains: query.search,
    };
  }

  let result;

  if (query.itemSku) {
    result = await prisma.item.findUnique({
      where: prismaQuery,
      select: prismaSelect,
    });

    /*result.itemVariantGroups = await getItemVariants({
      variants: result.itemVariants.map(({ id }) => id),
    });*/
  } else {
    result = await prisma.item.findMany({
      where: prismaQuery,
      select: prismaSelect,
    });
  }

  return result;
}

async function getItem(query, data) {
  const prismaQuery = {
    isActive: true,
  };
  if (query?.id) {
    prismaQuery.id = query.id;
  } else if (query?.sku) {
    prismaQuery.sku = query.sku;
  }

  const prismaSelect = {
    id: true,
    shortDescription: true,
    longDescription: true,
    price: true,
    discount: true,
    imagesType: true,
    sku: true,
    categories: {
      select: {
        id: true,
        description: true,
      },
    },
    images: {
      select: {
        id: true,
        url: true,
        sequenceNumber: true,
      },
      orderBy: {
        sequenceNumber: "asc",
      },
    },
    itemCustomVariants: {
      where: {
        isActive: true,
      },
      select: {
        id: true,
        description: true,
        url: true,
        enabled: true,
        sequenceNumber: true,
        itemVariantGroup: {
          select: {
            id: true,
            description: true,
          },
        },
        itemVariant: {
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
      orderBy: {
        sequenceNumber: "asc",
      },
    },
  };

  if (query.enabledItemCustomVariants) {
    prismaSelect.itemCustomVariants.where.enabled = true;
  }

  const result = await prisma.item.findUnique({
    where: prismaQuery,
    select: prismaSelect,
  });

  return result;
}

async function createItem(query, data) {
  const itemVariants = await prisma.itemVariant.findMany({
    where: {
      isActive: true,
    },
    select: {
      description: true,
      id: true,
      sequenceNumber: true,
      itemVariantGroupId: true,
    },
  });

  await prisma.item.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      sku: data.sku,
      imagesType: data.imagesType,
      categories: {
        connect: data.categories.map((category) => ({ id: category.id })),
      },
      images: {
        createMany: {
          data: data.images.map((image) => {
            return {
              url: image.url,
            };
          }),
        },
      },
      itemCustomVariants: {
        create: itemVariants.map((itemVariant) => ({
          description: itemVariant.description,
          url: "",
          sequenceNumber: itemVariant.sequenceNumber,
          enabled: false,
          itemVariant: {
            connect: {
              id: itemVariant.id,
            },
          },
          itemVariantGroup: {
            connect: {
              id: itemVariant.itemVariantGroupId,
            },
          },
        })),
      },
    },
  });
}

async function updateItem(query, data) {
  const prismaWhere = {};

  if (query.id) prismaWhere.id = Number(query.id);
  if (query.sku) prismaWhere.sku = query.sku;

  return await prisma.item.update({
    where: prismaWhere,
    data: { ...data },
  });

  /*const oldItem = await prisma.item.findFirst({
    where: { id: data.id },
    include: {
      itemVariants: true,
      categories: true,
      images: true,
    },
  });

  const [
    toBeRemovedItemVariants,
    toBeAddedItemVariants,
    commonItemVariants,
    commonOldItemVariants,
  ] = compareArrays(
    oldItem.itemVariants,
    data.itemVariants,
    (c1, c2) => c1.id == c2.id
  );

  const [
    toBeRemovedCategories,
    toBeAddedCategories,
    commonCategories,
    commonOldCategories,
  ] = compareArrays(
    oldItem.categories,
    data.categories,
    (c1, c2) => c1.id == c2.id
  );

  const [toBeRemovedImages, toBeAddedImages, commonImages, commonOldImages] =
    compareArrays(oldItem.images, data.images, (c1, c2) => c1.id == c2.id);

  await prisma.item.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      sku: data.sku,
      imagesType: data.imagesType,
      categories: {
        disconnect: toBeRemovedCategories.map((category) => ({
          id: category.id,
        })),
        connect: toBeAddedCategories.map((category) => ({ id: category.id })),
      },
      images: {
        disconnect: toBeRemovedImages.map((image) => ({ id: image.id })),
        createMany: {
          data: toBeAddedImages.map((image) => {
            return {
              url: image.url,
            };
          }),
        },
      },
      itemVariants: {
        disconnect: toBeRemovedItemVariants.map((itemVariant) => ({
          id: itemVariant.id,
        })),
        connect: toBeAddedItemVariants.map((itemVariant) => ({
          id: itemVariant.id,
        })),
      },
    },
  });

  return await getItems({ itemSku: data.sku });*/
}

async function removeItem(query, data) {
  await prisma.item.update({
    where: {
      id: Number(query.id),
    },
    data: {
      isActive: false,
    },
  });
  return "Done";
}

async function getItemVariants(query, data) {
  const prismaQuery = {
    select: {
      id: true,
      description: true,
      url: true,
    },
    where: {
      isActive: true,
    },
  };
  if (query?.variants) {
    prismaQuery.where = {
      isActive: true,
      id: {
        in: query.variants,
      },
    };
  }

  return await prisma.itemVariantGroup.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      description: true,
      itemVariants: prismaQuery,
    },
  });
}

async function createItemVariant(query, data) {
  await prisma.itemVariant.create({
    data: {
      description: data.description,
      url: data.url,
      itemVariantGroupId: data.itemVariantGroupId,
    },
  });
  return await getItemVariants();
}

async function updateItemVariant(query, data) {
  await prisma.itemVariant.update({
    where: {
      id: data.id,
    },
    data: {
      description: data.description,
      url: data.url,
    },
  });
  return await getItemVariants();
}

async function removeItemVariant(query, data) {
  await prisma.itemVariant.update({
    where: {
      id: Number(query.id),
    },
    data: {
      isActive: false,
    },
  });
  return await getItemVariants();
}

async function createItemVariantGroup(query, data) {
  await prisma.itemVariantGroup.create({
    data: {
      description: data.description,
      itemVariantGroupId: data.itemVariantGroupId,
    },
  });
  return await getItemVariants();
}

async function updateItemVariantGroup(query, data) {
  await prisma.itemVariantGroup.update({
    where: {
      id: data.id,
    },
    data: {
      description: data.description,
    },
  });
  return await getItemVariants();
}

async function removeItemVariantGroup(query, data) {
  await prisma.itemVariantGroup.update({
    where: {
      id: Number(query.id),
    },
    data: {
      isActive: false,
    },
  });
  return await getItemVariants();
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  getItemVariants,
  createItemVariant,
  updateItemVariant,
  removeItemVariant,
  createItemVariantGroup,
  updateItemVariantGroup,
  removeItemVariantGroup,
  removeItem,
};
