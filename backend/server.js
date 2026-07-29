import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import cors from "cors";
import helmet from "helmet";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({limit: "10mb"}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/photo", photoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
