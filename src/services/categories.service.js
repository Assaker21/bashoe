const prisma = require("../utils/prisma");

async function getCategories(query, data) {
  if (!query?.recursive) {
    if (Number(query.parentCategoryId)) {
      return await prisma.category.findUnique({
        where: {
          id: Number(query.parentCategoryId),
        },
        select: {
          subcategories: {
            where: {
              isActive: true,
            },
            select: {
              id: true,
              sku: true,
              description: true,
              parentCategoryId: true,
              sequenceNumber: true,
            },
            orderBy: {
              sequenceNumber: "asc",
            },
          },
          description: true,
          sku: true,
          id: true,
        },
      });
    } else {
      const subcategories = await prisma.category.findMany({
        where: {
          isActive: true,
          parentCategoryId: null,
        },
        select: {
          id: true,
          sku: true,
          description: true,
          parentCategoryId: true,
          sequenceNumber: true,
        },
        orderBy: {
          sequenceNumber: "asc",
        },
      });

      return { subcategories };
    }
  } else {
    return await prisma.category.findMany({
      where: {
        isActive: true,
        parentCategoryId: null,
      },
      select: {
        id: true,
        sku: true,
        description: true,
        sequenceNumber: true,

        subcategories: {
          select: {
            id: true,
            sku: true,
            description: true,
            sequenceNumber: true,

            subcategories: {
              select: {
                id: true,
                sku: true,
                description: true,
                sequenceNumber: true,

                subcategories: {
                  select: {
                    id: true,
                    sku: true,
                    description: true,
                    sequenceNumber: true,

                    subcategories: {
                      select: {
                        id: true,
                        sku: true,
                        description: true,
                        sequenceNumber: true,

                        subcategories: {
                          select: {
                            id: true,
                            sku: true,
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
          },
          orderBy: {
            sequenceNumber: "asc",
          },
        },
      },
      orderBy: {
        sequenceNumber: "asc",
      },
    });
  }
}

async function createCategory(query, data) {
  await prisma.category.create({
    data: {
      description: data.description,
      sku: data.sku,
      parentCategoryId: data.parentCategoryId,
      sequenceNumber: data.sequenceNumber,
    },
  });
  return await getCategories({ parentCategoryId: data.parentCategoryId });
}

async function updateCategory(query, data) {
  const result = await prisma.category.update({
    where: {
      id: Number(query.id),
    },
    data: {
      ...data,
    },
    select: {
      parentCategoryId: true,
    },
  });

  return "";
  //return await getCategories(result);
}

async function removeCategory(query, data) {
  const result = await prisma.category.update({
    where: {
      id: Number(query.id),
    },
    data: {
      isActive: false,
    },
    select: {
      parentCategoryId: true,
    },
  });

  return await getCategories(result);
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  removeCategory,
};
