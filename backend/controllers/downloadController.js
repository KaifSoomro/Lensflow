import Photo from "../models/photoModel.js";
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

    const existingDownloadUser = await Downloads.findOne({
      user: req.user._id,
    });

    if (!existingDownloadUser) {
      await Downloads.create({
        user: req.user._id,
        downloadedPhotos: [photoId],
      });

      photo.downloads += 1;
      await photo.save();

      return res.status(201).json({
        success: true,
        photo_url: image,
      });
    }

    existingDownloadUser.downloadedPhotos.push(photoId);
    await existingDownloadUser.save();

    photo.downloads += 1;
    await photo.save();

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

export const getDownloadHistory = async (req, res) => {
  try {
    const downloadHistory = await Downloads.find({
      user: req.user._id,
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "downloadedPhotos",
        select: "-user",
      });

    if (!downloadHistory) {
      return res.status(404).json({
        success: false,
        message: "No download history found",
      });
    }

    return res.status(200).json({
      success: true,
      downloadHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
