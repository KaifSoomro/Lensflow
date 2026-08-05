import User from "../models/userModel.js";
import Photo from "../models/photoModel.js";

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

export const addBookmark = async (req, res) => {
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
      return res.status(400).json({
        success: false,
        message: "Already in bookmarks",
      });
    }

    user.bookmarks.push(photoId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Added to bookmarks successfully.",
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
      return res.status(404).json({
        success: false,
        message: "No bookmarks found.",
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
