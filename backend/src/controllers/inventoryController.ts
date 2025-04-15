import { Request, Response } from "express";
import Inventory from "../models/inventory";

export const getInventory = async (req: Request, res: Response) => {
  try {
    const parts = await Inventory.find();
    // console.log("Fetched inventory parts:", parts);
    res.status(200).json(parts);
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteInventoryPart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { part_id, name } = req.body;

    if (!part_id && !name) {
      res.status(400).json({ message: "Please provide part_id or name." });
      return;
    }

    const query = part_id ? { part_id } : { name };
    const deletedPart = await Inventory.findOneAndDelete(query);

    if (!deletedPart) {
      res.status(404).json({ message: "Motor part not found." });
      return;
    }

    res
      .status(200)
      .json({ message: "Motor part deleted successfully.", deletedPart });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addInventoryPart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, quantity, price } = req.body;

    // Validate input
    if (!name || quantity == null || price == null) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const lastPart = await Inventory.findOne().sort({ part_id: -1 }).limit(1);

    // Check if lastPart exists, otherwise start part_id at 1
    const part_id = lastPart && lastPart.part_id ? lastPart.part_id + 1 : 1;

    const newPart = new Inventory({
      part_id,
      name,
      quantity,
      price,
      rack_position: req.body.rack_position || "N/A",
      vendor_email: req.body.vendor_email || "N/A",
    });

    await newPart.save();

    res
      .status(201)
      .json({ message: "Motor part added successfully!", newPart });
  } catch (error) {
    console.error("Error adding part:", error);
    res.status(500).json({ message: "Server error" });
  }
};
