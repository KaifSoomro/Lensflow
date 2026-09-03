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
    const { photoType, userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const content = await Photo.find({ user: userId }).populate(
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
    const { userId } = req.params;
    const photos = await Photo.find({ user: userId });
    const collection = await Collection.findOne({ user: userId });

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
      collections: collection.photos.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in getProfilePhotoCounts.",
    });
  }
};
