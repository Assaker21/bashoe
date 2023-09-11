import express from "express";
import { init, createInit } from "../controllers/init.controller.js";

const router = express.Router();

router.get("/", init);

//router.post("/", createInit);

export default router;
