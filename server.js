import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import itemRoute from "./routes/item.route.js";
import orderRoute from "./routes/order.route.js";
import initRoute from "./routes/init.route.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: process.env.SRC, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/items", itemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/init", initRoute);

app.use(
  "/",
  express.Router().get("/", (req, res) => {
    res.send("get out of here :)");
  })
);

app.listen(1234, () => {
  connect();
  console.log("Backend server is running 🚀");
});
