import express from "express";
import { createVendor, getVendors } from "../controllers/vendorController";

const router = express.Router();

router.post("/add", createVendor);
router.get("/", getVendors);

export default router;
