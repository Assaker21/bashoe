const prisma = require("../utils/prisma");

async function createEntry(query, data) {
  return await prisma.analytic.create({
    data: {
      ipAddress: data.ip,
      time: data.time,
    },
  });
}

async function getEntries() {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 120);

  const entries = await prisma.analytic.groupBy({
    by: ["time"],
    _count: {
      _all: true,
    },
    where: {
      time: {
        gte: startDate,
        lt: today,
      },
    },
    orderBy: {
      time: "asc",
    },
  });

  const countsPerDay = entries.map((entry) => ({
    date: entry.time.toISOString().split("T")[0], // Convert datetime to date string
    count: entry._count._all,
  }));

  const data = {};
  for (let counts of countsPerDay) {
    if (!data[counts.date]) data[counts.date] = 0;
    data[counts.date] += counts.count;
  }

  return data;
}

module.exports = {
  createEntry,
  getEntries,
};
