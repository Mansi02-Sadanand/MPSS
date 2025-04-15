import express from "express";
import {
  getInventory,
  deleteInventoryPart,
  addInventoryPart,
} from "../controllers/inventoryController";

const router = express.Router();

router.get("/", getInventory);
router.post("/", addInventoryPart);
router.delete("/", deleteInventoryPart);

export default router;
