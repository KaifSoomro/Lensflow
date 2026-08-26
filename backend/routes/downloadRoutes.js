import express from "express";
import { downloadPhoto } from "../controllers/downloadController";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/photo", protectRoute, downloadPhoto);

export default router;