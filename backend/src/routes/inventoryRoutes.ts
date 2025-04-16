import { Router, Request, Response } from "express";
import {
  getInventory,
  deleteInventoryPart,
  addInventoryPart,
  getLowStockItems,
  reorderMail
} from "../controllers/inventoryController";



const router = Router();

router.post("/reorder-email", reorderMail);

router.get("/", getInventory);
router.post("/", addInventoryPart);
router.delete("/", deleteInventoryPart);
router.get("/low-stock", getLowStockItems);

export default router;
