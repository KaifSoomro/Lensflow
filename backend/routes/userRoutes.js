import express from "express";
import {
  addBookmark,
  getBookmarkIds,
  getBookmarks,
  getProfile,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:userId", protectRoute, getProfile);
router.post("/add/bookmark", protectRoute, addBookmark);
router.get("/get/bookmarks", protectRoute, getBookmarks);
router.get("/get/bookmarksId", protectRoute, getBookmarkIds);

export default router;
