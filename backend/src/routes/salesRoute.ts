import express from "express";
import { createSale,getSale } from "../controllers/salesController";

const router = express.Router();

router.post("/",createSale);
router.get("/",getSale);

export default router;
