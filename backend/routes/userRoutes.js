import express from "express";
import {
  getProfile,
  getProfileContent,
  getProfilePhotoCounts,
  updateProfile,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:userId", protectRoute, getProfile);
router.get("/profile/content/:photoType/:userId", protectRoute, getProfileContent);
router.get("/profile/photos/counts/:userId", protectRoute, getProfilePhotoCounts);
router.post("/profile/update", protectRoute, updateProfile);

export default router;
