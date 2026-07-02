import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
