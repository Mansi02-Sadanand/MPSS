import { Request, Response } from "express";
import Vendor from "../models/Vendor";

export const createVendor = async (req: Request, res: Response) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getVendors = async (_req: Request, res: Response) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
