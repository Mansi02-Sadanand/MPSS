import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    part_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    rack_position: { type: String, required: true },
    vendor_email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);
