import { Request, Response } from "express";
import nodemailer from "nodemailer";
import Inventory from "../models/inventory";

export const reorderMail = async (req: Request, res: Response):Promise<void> => {
  const { part_id } = req.body;

  try {
    // Find the inventory item by part_id
    const item = await Inventory.findOne({ part_id });
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return 
    }
    if (!item.vendor_email) {
      res.status(400).json({ error: "Vendor email is missing" });
      return 
    }
    
    
    // Create the transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Use only during development
      },
    });

    // Set up mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: item.vendor_email,
      subject: `Reorder Request for Part ID ${item.part_id}`,
      html: `
        <p>Hello Vendor,</p>
        <p>Please reorder the following part:</p>
        <ul>
          <li><strong>Name:</strong> ${item.name}</li>
          <li><strong>Quantity:</strong>50</li>
        </ul>
      `,
    };
    console.log(mailOptions);
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    res.status(200).json({ message: "Email sent successfully." });
    
  } catch (error) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Failed to send email", details: errorMessage });
  }
}

export const getInventory = async (req: Request, res: Response) => {
  try {
    const parts = await Inventory.find();
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

export const getLowStockItems = async (req: Request, res: Response) => {
  try {
    const lowStockItems = await Inventory.find({ quantity: { $lt: 16 } });

    res.status(200).json(lowStockItems);
  } catch (error) {
    console.error("Error fetching low stock items:", error);
    res.status(500).json({ error: "Server error while fetching items." });
  }
};
