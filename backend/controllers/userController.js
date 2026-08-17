import User from "../models/userModel.js";
import Photo from "../models/photoModel.js";
import Collection from "../models/collectionModel.js";

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById({ _id: userId }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in getProfile controller.",
      error: error.message,
    });
  }
};

export const getProfileContent = async (req, res) => {
  try {
    const { photoType } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const content = await Photo.find({ user: user._id }).populate(
      "user",
      "-password",
    );
    if (!content) {
      return res.status(400).json({
        success: false,
        message: "User didn't posted yet.",
      });
    }

    const categoriedContent = content.filter((c) => c.type === photoType);

    if (categoriedContent.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Didn't posted ${photoType} yet.`,
      });
    }

    return res.status(200).json({
      success: true,
      content: categoriedContent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in getProfileContent.",
    });
  }
};

export const getProfilePhotoCounts = async (req, res) => {
  try {
    const photos = await Photo.find({ user: req.user._id });
    const collections = await Collection.find();

    if (!photos) {
      return res.status(404).json({
        success: false,
        message: "No photos found.",
      });
    }

    const realPhotos = photos.filter((p) => p.type === "photo");
    const illustration = photos.filter((p) => p.type === "illustration");

    return res.status(200).json({
      success: true,
      photos: realPhotos.length,
      illustrations: illustration.length,
      collections: collections.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in getProfilePhotoCounts.",
    });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const { photoId } = req.body;
    const user = await User.findById(req.user._id);
    const photo = await Photo.findById(photoId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === photoId,
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== photoId);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Removed from bookmarks.",
      });
    }

    user.bookmarks.push(photoId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Added to bookmarks.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in addBookmark controller.",
      error: error.message,
    });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("bookmarks")
      .populate({
        path: "bookmarks",
        populate: {
          path: "user",
          select: "-password",
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.bookmarks.length === 0) {
      return res.status(200).json({
        bookmarks: user.bookmarks,
      });
    }

    return res.status(200).json({
      success: true,
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in getBookmarks controller.",
      error: error.message,
    });
  }
};

export const getBookmarkIds = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("bookmarks").lean();

    return res.status(200).json({
      success: true,
      bookmarksId: user.bookmarks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.bookmarks = [];
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Bookmarks cleared successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in clearBookmarks.",
    });
  }
};

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
