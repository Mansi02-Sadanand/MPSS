import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import vendorRoutes from "./routes/vendorRoutes";
import salesRoute from "./routes/salesRoute";
import inventoryRoutes from "./routes/inventoryRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Pull from env, fallback to localhost in dev
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// CORS: Allow only frontend access
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  const uri =  process.env.MONGO_URI
  if (!uri) {
    console.error("❌ MONGO_URI is not defined");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri); // Required for TS compatibility
    console.log(" MongoDB connected successfully");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1); // Exit process if DB connection fails
  }
};

connectDB();

// Global Error Handling Middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled Server Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

// Routes
app.use("/api/vendors", vendorRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoute);

// Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
