import express from "express";
import {
  createItem,
  getItems,
  editItem,
  deleteItem,
  getBrands,
} from "../controllers/item.controller.js";

const router = express.Router();

router.get("/", getItems);

router.post("/", createItem);

router.get("/cats", getBrands);

router.patch("/", editItem);

router.delete("/:id", deleteItem);

router.get("/shippingFee", (req, res) => {
  res.status(200).send(4);
});

export default router;
