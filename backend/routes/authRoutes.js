import express from "express";
import {
  changePassword,
  login,
  signup,
  verifyEmail,
} from "../controllers/authController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify/:token", verifyEmail);
router.post("/login", login);
router.post("/change-password", protectRoute, changePassword);

export default router;
