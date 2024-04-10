const prisma = require("../utils/prisma");

async function createEntry(query, data) {
  return await prisma.analytic.create({
    data: {
      ipAddress: data.ip,
      time: data.time,
    },
  });
}

module.exports = {
  createEntry,
};
