import express from "express";
import {
  toggleBookmark,
  getBookmarkIds,
  getBookmarks,
  clearBookmarks,
} from "../controllers/bookmarkController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/toggle/bookmark", protectRoute, toggleBookmark);
router.get("/get/bookmarks", protectRoute, getBookmarks);
router.get("/get/bookmarksId", protectRoute, getBookmarkIds);
router.delete("/delete/bookmarks", protectRoute, clearBookmarks);

export default router;
