"use client";

import { useState } from "react";
import initialParts from "../../../../inventorySample/inventory.json"; // Adjust path as needed

export default function SalesPage() {
  // Local state for inventory, form inputs, bill details, and messages
  const [parts, setParts] = useState(initialParts);
  const [form, setForm] = useState({
    accountantName: "",
    customerName: "",
    itemId: "",
    quantity: ""
  });
  const [bill, setBill] = useState<any>(null);
  const [message, setMessage] = useState("");

  console.log(parts);
  
  // Handle form input changes
  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Generate the bill when the form is submitted
  const handleGenerateBill = (e:any) => {
    e.preventDefault();

    const { accountantName, customerName, itemId, quantity } = form;
    const requestedQuantity = parseInt(quantity, 10);
    const id = parseInt(itemId, 10);

    // Validate form inputs
    if (!accountantName || !customerName || !itemId || !quantity) {
      setMessage("Please fill all fields");
      return;
    }

    // Find the part by ID
    const part = parts.find((p:any) => p.id === id);
    if (!part) {
      setMessage("Item not available");
      return;
    }

    // Check if enough quantity is available
    if (requestedQuantity > part.quantity) {
      setMessage("Insufficient quantity in stock");
      return;
    }

    // Calculate the total amount for the bill
    const totalAmount = requestedQuantity * part.price;

    // Create a bill object
    const newBill = {
      accountantName,
      customerName,
      item: part.name,
      itemId: part.id,
      unitPrice: part.price,
      quantity: requestedQuantity,
      totalAmount
    };

    // Update the parts inventory by deducting the requested quantity
    const updatedParts = parts.map((p:any) => {
      if (p.id === id) {
        return { ...p, quantity: p.quantity - requestedQuantity };
      }
      return p;
    });
    setParts(updatedParts);

    // Set the generated bill and success message
    setBill(newBill);
    setMessage("Bill generated successfully!");

    // Clear the form
    setForm({
      accountantName: "",
      customerName: "",
      itemId: "",
      quantity: ""
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-teal-600 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Generate Bill</h2>
      <form onSubmit={handleGenerateBill} className="space-y-4">
        <div>
          <label className="block text-gray-700">Accountant Name:</label>
          <input
            type="text"
            name="accountantName"
            value={form.accountantName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Item ID:</label>
          <input
            type="number"
            name="itemId"
            value={form.itemId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Generate Bill
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      {bill && (
        <div className="mt-6 p-4 border rounded-md text-gray-950 bg-gray-50">
          <h3 className="text-xl font-bold mb-2">Bill Details</h3>
          <p><strong>Accountant:</strong> {bill.accountantName}</p>
          <p><strong>Customer:</strong> {bill.customerName}</p>
          <p><strong>Item:</strong> {bill.item} (ID: {bill.itemId})</p>
          <p><strong>Unit Price:</strong> ${bill.unitPrice.toFixed(2)}</p>
          <p><strong>Quantity:</strong> {bill.quantity}</p>
          <p><strong>Total Amount:</strong> ${bill.totalAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
