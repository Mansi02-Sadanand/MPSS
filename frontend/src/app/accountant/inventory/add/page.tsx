"use client";

import { useState } from "react";
import initialParts from "../../../../../inventorySample/inventory.json";

export default function AddMotorPart() {
  const [parts, setParts] = useState(initialParts);
  const [newPart, setNewPart] = useState({ name: "", quantity: "", price: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e:any) => {
    setNewPart({ ...newPart, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const newId = parts.length ? parts[parts.length - 1].id + 1 : 1;
    const partToAdd = {
      id: newId,
      name: newPart.name,
      quantity: parseInt(newPart.quantity, 10),
      price: parseFloat(newPart.price),
    };

    // Update the parts array (this is only in memory)
    setParts([...parts, partToAdd]);
    setMessage("Motor part added successfully!");
    setNewPart({ name: "", quantity: "", price: "" });
  };
//   console.log(parts);
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg ">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Add Motor Part</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div >
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={newPart.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-gray-800"
          />
        </div>
        <div>
          <label className="block text-gray-700">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={newPart.quantity}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-gray-800"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={newPart.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-gray-800"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Add Part
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-green-600">{message}</p>
      )}
    </div>
  );
}
