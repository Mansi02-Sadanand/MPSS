import express, { Request, Response } from "express";
import {
  getInventory,
  deleteInventoryPart,
  addInventoryPart,
  getLowStockItems,
} from "../controllers/inventoryController";

import nodemailer from "nodemailer";
import Inventory from "../models/inventory";

const router = express.Router();

router.post("/reorder-email", async (req: Request, res: Response) => {
  const { part_id } = req.body;

  try {
    const item = await Inventory.findOne({ part_id });

    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    // Updated transporter configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Only use during development!
      },
    });

    if (!item.vendor_email) {
      res.status(400).json({ error: "Vendor email is missing" });
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: item.vendor_email,
      subject: `Reorder Request for Part ID ${item.part_id}`,
      html: `
        <p>Hello Vendor,</p>
        <p>Please reorder the following part:</p>
        <ul>
          <li><strong>Name:</strong> ${item.name}</li>
          <li><strong>Quantity:</strong> ${item.quantity}</li>
          <li><strong>Rack Position:</strong> ${item.rack_position}</li>
        </ul>
      `,
    };

    // Add more detailed logging
    console.log("Attempting to send email to:", item.vendor_email);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Email error details:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res
      .status(500)
      .json({ error: "Failed to send email", details: errorMessage });
  }
});

router.get("/", getInventory);
router.post("/", addInventoryPart);
router.delete("/", deleteInventoryPart);
router.get("/low-stock", getLowStockItems);

export default router;
