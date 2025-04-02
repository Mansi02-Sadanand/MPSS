"use client";

import { useState } from "react";
import initialParts from "../../../../../inventorySample/inventory.json"; // Adjust path as needed

export default function DeleteMotorPart() {
    
    const [parts, setParts] = useState(initialParts);
    const [deleteInput, setDeleteInput] = useState("");
    const [message, setMessage] = useState("");
    console.log(parts);

  const handleDelete = () => {
    const filteredParts = parts.filter(
      (part) =>
        part.id !== parseInt(deleteInput, 10) &&
        part.name.toLowerCase() !== deleteInput.toLowerCase()
    );

    if (filteredParts.length === parts.length) {
      setMessage("No matching motor part found!");
    } else {
      setParts(filteredParts);
      setMessage("Motor part deleted successfully!");
    }

    setDeleteInput("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">Delete Motor Part</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700">Enter ID or Name:</label>
        <input
          type="text"
          value={deleteInput}
          onChange={(e) => setDeleteInput(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-gray-800"
          placeholder="Enter part ID or name"
        />
      </div>

      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
      >
        Delete Part
      </button>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Current Motor Parts</h3>
        <ul>
          {parts.map((part) => (
            <li key={part.id} className="mb-1">
              <strong>{part.name}</strong> (ID: {part.id}) - Qty: {part.quantity} - Price: ${part.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
