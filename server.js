import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js";

//Route Imports
import { authRoutes } from './routes/authRoutes.js';
import { userRoutes } from './routes/userRoutes.js';

connectDB();

const app = express();

app.use(express.json());


//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
        console.log(`Server is running on port number: ${PORT}`);
        console.log(`Api Docs: http://localhost:${PORT}/api-docs`);
})