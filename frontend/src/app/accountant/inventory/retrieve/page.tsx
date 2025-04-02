"use client";

import initialParts from "../../../../../inventorySample/inventory.json"; 

export default function ShowData() {
    // console.log(initialParts);
    
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center">Motor Parts Inventory</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {initialParts.map((part) => (
              <tr key={part.id} className="text-center hover:bg-black">
                <td className="border border-gray-300 px-4 py-2">{part.id}</td>
                <td className="border border-gray-300 px-4 py-2">{part.name}</td>
                <td className="border border-gray-300 px-4 py-2">{part.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">${part.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
