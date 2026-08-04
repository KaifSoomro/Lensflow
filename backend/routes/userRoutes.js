import express from "express";
import { addBookmark, getProfile } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:userId", protectRoute, getProfile);
router.post("/add/bookmark", protectRoute, addBookmark);

export default router;