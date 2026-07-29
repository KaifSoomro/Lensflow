import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { uploadPhoto } from "../controllers/photoController.js";

const router = express.Router();

router.post("/upload", protectRoute, uploadPhoto);

export default router;