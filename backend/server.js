import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
