import express from "express";
import {
  createCollection,
  getCollections,
  getCollectionPhotoIds,
  getCollectionById,
  toggleCollection,
} from "../controllers/collectionController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createCollection);
router.get("/getAll", protectRoute, getCollections);
router.get("/photoIds", protectRoute, getCollectionPhotoIds);
router.get("/:collectionId", protectRoute, getCollectionById);
router.post("/toggle/:collectionId", protectRoute, toggleCollection);

export default router;
