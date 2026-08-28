import express from "express";
import {
  downloadPhoto,
  getDownloadHistory,
} from "../controllers/downloadController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/photo", protectRoute, downloadPhoto);
router.get("/history", protectRoute, getDownloadHistory);

export default router;
