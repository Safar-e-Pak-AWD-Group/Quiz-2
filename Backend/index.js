import express from "express";
import connectToMongo from "./db.js";
import userRoutes from "./components/all-user.js";
import bookingRoutes from "./components/bookingRoutes.js";
import adminpanel from "./components/admin.js";

import cors from "cors";

const app = express();
const port = 5000;

// ✅ Connect to MongoDB
connectToMongo();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Default route
app.get("/", (req, res) => {
  res.send("✅ SafarPak Backend Running");
});

// ✅ User Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminpanel);

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
