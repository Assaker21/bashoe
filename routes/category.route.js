import express from "express";
import {
  getCategories,
  updateCategories,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", updateCategories);

export default router;
