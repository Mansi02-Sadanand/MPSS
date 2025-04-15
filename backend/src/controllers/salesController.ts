import { Request, Response } from "express";
import Sales from "../models/Sales";         
import Inventory from "../models/inventory"; 

export const getSale = async (req: Request, res: Response) => {
    try {
      const sale = await Sales.find();
    //   console.log("Fetched saved-sales:", sale);
      res.status(200).json(sale);
    } catch (error) {
      console.error("Failed to fetch sales:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

export const createSale = async (req: Request, res: Response) => {
  const { accountant_name, customer_name, item_id, price, quantity } = req.body;
  try {
    const inventoryItem = await Inventory.findOne({ part_id: item_id });
    
    if (!inventoryItem) {
     res.status(404).json({ message: "Item not found in inventory." });
     return;
    }
    
    if ((inventoryItem.quantity ?? 0) < quantity) {
     res.status(400).json({ message: "Insufficient quantity in inventory." });
    }

    inventoryItem.quantity! -= quantity;
    await inventoryItem.save();

    const sale = new Sales({
      accountant_name,
      customer_name,
      item_id,
      price,
      quantity,
    });
    
    await sale.save();
    
    res.status(201).json({ message: "Sale successful.", sale });
    
  } catch (error:any) {
    console.error("Error processing sale:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
