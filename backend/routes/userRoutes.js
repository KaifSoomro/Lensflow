import express from "express";
import {
  toggleBookmark,
  getBookmarkIds,
  getBookmarks,
  getProfile,
  clearBookmarks,
  getProfileContent,
  getProfilePhotoCounts,
  createCollection,
  getCollections,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:userId", protectRoute, getProfile);
router.get("/profile/content/:photoType", protectRoute, getProfileContent);
router.get("/profile/photos/counts", protectRoute, getProfilePhotoCounts);
router.post("/toggle/bookmark", protectRoute, toggleBookmark);
router.get("/get/bookmarks", protectRoute, getBookmarks);
router.get("/get/bookmarksId", protectRoute, getBookmarkIds);
router.delete("/delete/bookmarks", protectRoute, clearBookmarks);
router.post("/collection/create", protectRoute, createCollection);
router.get("/collection/getAll", protectRoute, getCollections);

export default router;
