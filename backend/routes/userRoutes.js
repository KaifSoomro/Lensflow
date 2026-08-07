import express from "express";
import {
  toggleBookmark,
  getBookmarkIds,
  getBookmarks,
  getProfile,
  clearBookmarks,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:userId", protectRoute, getProfile);
router.post("/toggle/bookmark", protectRoute, toggleBookmark);
router.get("/get/bookmarks", protectRoute, getBookmarks);
router.get("/get/bookmarksId", protectRoute, getBookmarkIds);
router.delete("/delete/bookmarks", protectRoute, clearBookmarks);

export default router;
