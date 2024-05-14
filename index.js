const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

const allowedOrigins = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5174",
  "http://localhost:5174",
  "http://localhost:5173/images",
  "https://hoophousev2-admin.onrender.com",
  "https://hoophousev2.onrender.com",
  "https://hoophouselb.onrender.com",
  "https://hoophouse.store",
  "https://www.hoophouse.store",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.static("src/uploads"));
app.use(cors(corsOptions));
app.use(express.json());

const {
  itemsRouter,
  categoriesRouter,
  ordersRouter,
  listsRouter,
  imagesRouter,
  analyticsRouter,
  authenticationRouter,
  paymentsRouter,
} = require("./src/routes/index.js");
const sendOrderMail = require("./src/utils/mail.js");
const prisma = require("./src/utils/prisma.js");

app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
app.use("/orders", ordersRouter);
app.use("/lists", listsRouter);
app.use("/images", imagesRouter);
app.use("/analytics", analyticsRouter);
app.use("/authentication", authenticationRouter);
app.use("/payments", paymentsRouter);
app.use("/", async (req, res) => {
  /*const order = await prisma.order.findUnique({
    where: { id: 12 },
    include: {
      user: true,
      address: {
        include: {
          country: true,
        },
      },
      orderItems: {
        include: {
          item: {
            include: {
              images: true,
            },
          },
          itemVariant: true,
        },
      },
      orderStatus: true,
    },
  });
  sendOrderMail("bloackhead@gmail.com", "order", order);*/
  res.send("No.");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
