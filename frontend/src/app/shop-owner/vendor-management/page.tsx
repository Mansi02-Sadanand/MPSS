"use client";
import { useState } from "react";

const vendors = [
    { name: "AutoTech Supplies", part: "Brakes", email: "contact@autotech.com", phone: "9876543210", address: "Mumbai, India" },
    { name: "Speedy Motors", part: "Engine", email: "info@speedymotors.com", phone: "8765432109", address: "Delhi, India" },
    { name: "GearUp Auto", part: "Transmission", email: "support@gearupauto.com", phone: "7654321098", address: "Pune, India" },
    { name: "Turbo Parts", part: "Turbocharger", email: "sales@turboparts.com", phone: "6543210987", address: "Chennai, India" },
    { name: "WheelWorks", part: "Wheels", email: "contact@wheelworks.com", phone: "9988776655", address: "Bangalore, India" },
    { name: "PowerRide", part: "Batteries", email: "service@powerride.com", phone: "9123456780", address: "Hyderabad, India" },
    { name: "DriveLine Auto", part: "Steering", email: "info@drivelineauto.com", phone: "9812345678", address: "Kolkata, India" },
    { name: "EcoFuel Systems", part: "Fuel Injectors", email: "support@ecofuel.com", phone: "9432109876", address: "Lucknow, India" }
];

export default function VendorManagement() {
    const [filter, setFilter] = useState("");

    const filteredVendors = vendors.filter(vendor =>
        vendor.part.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white flex justify-center items-center">
            <div className="w-full max-w-5xl">
                <h2 className="text-3xl font-bold mb-6 text-green-400 text-center">Vendor Management</h2>
                <input
                    type="text"
                    placeholder="Filter by motor part"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border p-3 mb-6 w-full rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="overflow-x-auto">
                    <table className="min-w-full border rounded-lg">
                        <thead>
                            <tr className="bg-green-500 text-white">
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Part</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Phone</th>
                                <th className="p-4 text-left">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVendors.map((vendor, index) => (
                                <tr key={index} className="border-b hover:bg-gray-700">
                                    <td className="p-4">{vendor.name}</td>
                                    <td className="p-4">{vendor.part}</td>
                                    <td className="p-4">{vendor.email}</td>
                                    <td className="p-4">{vendor.phone}</td>
                                    <td className="p-4">{vendor.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
