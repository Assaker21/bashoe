const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

const allowedOrigins = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5174",
  "https://hoophousev2-admin.onrender.com",
  "https://hoophousev2.onrender.com",
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

app.use(express.static("uploads"));
app.use(cors(corsOptions));
app.use(express.json());

const {
  itemsRouter,
  categoriesRouter,
  ordersRouter,
  listsRouter,
  imagesRouter,
} = require("./src/routes/index.js");

app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
app.use("/orders", ordersRouter);
app.use("/lists", listsRouter);
app.use("/images", imagesRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
