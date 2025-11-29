import mongoose from "mongoose";

const mongoURL = "mongodb://localhost:27017/SafarPak";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB: SafarPak");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

export default connectToMongo;
