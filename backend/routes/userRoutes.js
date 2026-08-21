import express from "express";
import {
  getProfile,
  getProfileContent,
  getProfilePhotoCounts,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:userId", protectRoute, getProfile);
router.get("/profile/content/:photoType", protectRoute, getProfileContent);
router.get("/profile/photos/counts", protectRoute, getProfilePhotoCounts);

export default router;
