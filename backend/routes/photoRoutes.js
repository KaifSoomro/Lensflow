import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { uploadPhoto } from "../controllers/photoController.js";
import upload from "../middlewares/multer.js"

const router = express.Router();

router.post("/upload", protectRoute, upload.single("image"), uploadPhoto);
router.get("/all", getAllPhotos);

export default router;