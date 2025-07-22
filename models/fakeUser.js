import mongoose from "mongoose";

const fakeUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    dob: String,
    phone: String,
    address: String
}, { timestamps: true });

export default mongoose.model("FakeUser", fakeUserSchema);