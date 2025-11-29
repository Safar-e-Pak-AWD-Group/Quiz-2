import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ Create new booking
// POST /api/bookings
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      tripType,
      destination,
      transport,
      hotel,
      attractions,
      price,
      status,
      date,
    } = req.body;

    if (!userId || !destination || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking({
      userId,
      tripType,
      destination,
      transport,
      hotel,
      attractions,
      price,
      status,
      date,
    });

    const savedBooking = await newBooking.save();
    console.log("✅ Booking saved:", savedBooking);
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("❌ Booking save error:", err);
    res.status(500).json({ message: "Server error while saving booking" });
  }
});


// router.post("/api/bookings", async (req, res) => {
//   try {
//     const booking = req.body;
//     console.log("📦 Received Booking:", booking);
//     res.status(201).json({ message: "Booking saved!" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save booking" });
//   }
// });


// ✅ Get all bookings for a specific user
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const bookings = await Booking.find({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
});

// 🗑 DELETE a booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
