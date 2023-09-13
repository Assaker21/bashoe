import express from "express";
import { init, updateInit } from "../controllers/init.controller.js";

const router = express.Router();

router.get("/", init);

router.post("/", updateInit);

//router.post("/", createInit);

export default router;
