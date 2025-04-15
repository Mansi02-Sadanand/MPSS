import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    part_id: Number,
    name: String,
    quantity: Number,
    price: Number,
    rack_position: String,
    vendor_email: String,
  },
  { collection: "inventory" } //
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
