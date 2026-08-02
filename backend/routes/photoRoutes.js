import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { addViews, getAllPhotos, getSinglePhoto, uploadPhoto } from "../controllers/photoController.js";
import upload from "../middlewares/multer.js"

const router = express.Router();

router.post("/upload", protectRoute, upload.single("image"), uploadPhoto);
router.get("/all", getAllPhotos);
router.get("/single/:photoId", getSinglePhoto);
router.post("/views/:photoId", addViews);

export default router;