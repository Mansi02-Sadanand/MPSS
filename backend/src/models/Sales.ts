import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    accountant_name: String,
    customer_name: String,
    item_id: Number,
    price: Number,
    quantity: Number,
  },
  { timestamps: true }
);

const Sales = mongoose.model("sales", salesSchema);
export default Sales;
