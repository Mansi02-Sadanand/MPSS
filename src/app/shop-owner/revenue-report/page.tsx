"use client";
import { useState } from "react";

const initialSales = [
    { vendor: "AutoTech Supplies", amount: 15000 },
    { vendor: "Speedy Motors", amount: 20000 },
    { vendor: "GearUp Auto", amount: 18000 },
    { vendor: "Turbo Parts", amount: 22000 },
];

export default function RevenueCalculation() {
    const [sales, setSales] = useState(initialSales);

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);

    return (
        <div className="p-10 min-h-screen bg-gray-900 text-white flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8">Motor Part Shop Software</h1>
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Revenue Calculation</h2>
                <table className="min-w-full border rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="p-4 text-left">Vendor</th>
                            <th className="p-4 text-left">Revenue (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => (
                            <tr key={index} className="border-b hover:bg-green-700 transition">
                                <td className="p-4">{sale.vendor}</td>
                                <td className="p-4">₹{sale.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-green-600 font-bold text-white">
                            <td className="p-4">Total Revenue</td>
                            <td className="p-4">₹{totalRevenue.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}