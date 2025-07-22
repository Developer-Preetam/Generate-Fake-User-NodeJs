import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
export const connectDB = () => {
    mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Connecting Error", err))
}
