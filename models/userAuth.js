import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: { type: String, default: "user"}
});

export default mongoose.model("UserAuth", userAuthSchema);