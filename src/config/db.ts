import mongoose from "mongoose"

export const connectDb =async () => {
const url = process.env.MONGO_URI || ""
try {
    await mongoose.connect(url)
    console.log("✅ MongoDB Connected...");

} catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
}
}