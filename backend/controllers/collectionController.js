import Collection from "../models/collectionModel.js";

export const createCollection = async (req, res) => {
  try {
    const { collectionName, photoId, isPrivate } = req.body;
    const userId = req.user._id;

    if (!collectionName) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required.",
      });
    }

    await Collection.create({
      user: userId,
      collectionName,
      photos: [photoId],
      private: isPrivate,
    });

    return res.status(201).json({
      success: true,
      message: "Collection created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in createCollection.",
    });
  }
};

export const getCollections = async (req, res) => {
  try {
    const userId = req.user._id;
    const collections = await Collection.find({ user: userId }).populate({
      path: "photos user",
      select: "-password",
    });

    if (!collections) {
      return res.status(404).json({
        success: false,
        message: "No collections found.",
      });
    }

    return res.status(200).json({
      success: true,
      collections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in getCollections.",
    });
  }
};

export const getCollectionPhotoIds = async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user._id })
      .select("photos")
      .lean();

    if (!collections) {
      return res.status(404).json({
        success: false,
        message: "Collections not found.",
      });
    }

    const collectionPhotoIds = collections.flatMap(
      (collection) => collection.photos,
    );

    return res.status(200).json({
      success: true,
      collectionPhotoIds,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const collection = await Collection.findById(collectionId)
      .populate({
        path: "user",
        select: "-password -isVerified",
      })
      .populate({
        path: "photos",
        populate: {
          path: "user",
          select: "-password -isVerified",
        },
      });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collections not found.",
      });
    }

    return res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { photoId } = req.body;

    const collection = await Collection.findById(collectionId);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found.",
      });
    }

    const existingPhoto = collection.photos.some(
      (p) => p._id.toString() === photoId.toString(),
    );

    if (!existingPhoto) {
      collection.photos.push(photoId);
      await collection.save();

      return res.status(200).json({
        success: true,
        message: "Added to collection",
      });
    }

    collection.photos = collection.photos.filter(
      (p) => p._id.toString() !== photoId.toString(),
    );

    await collection.save();

    return res.status(200).json({
      success: true,
      message: "Removed from collection",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};