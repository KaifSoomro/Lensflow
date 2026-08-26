import Photo from "../models/photoModel.js";
import User from "../models/userModel.js";
import Downloads from "../models/downloadHistoryModel.js";

export const downloadPhoto = async (req, res) => {
  try {
    const { photoSize, photoId } = req.body;

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found.",
      });
    }

    let image;
    if (photoSize === "image") {
      image = photo.image;
    } else if (photoSize === "cardImage") {
      image = photo.cardImage;
    } else {
      image = photo.previewImage;
    }

    const existingDownloadUser = await Downloads.find({ user: req.user._id });

    if (!existingDownloadUser) {
      await Downloads.create({
        user: req.user._id,
        downloadedPhotos: [photoId],
      });

      return res.status(201).json({
        success: true,
        photo_url: image,
      });
    }

    existingDownloadUser.downloadedPhotos.push(photoId);
    await existingDownloadUser.save();

    return res.status(200).json({
      success: true,
      photo_url: image,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
