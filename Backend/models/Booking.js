import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tripType: {
      type: String,
      enum: ["predefined", "popular", "custom"],
      required: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    transport: {
      type: String,
      default: "N/A",
    },

    hotel: {
      type: String,
      default: "N/A",
    },

    attractions: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed",
    },

    date: {
      type: String, // ✅ saved as "YYYY-MM-DD" from frontend
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
