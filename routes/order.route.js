import express from "express";
import { getOrders, createOrder, finishOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);

router.post("/", createOrder);

router.patch("/", finishOrder);

export default router;
