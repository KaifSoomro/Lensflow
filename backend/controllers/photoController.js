import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import Photo from "../models/photoModel.js";
import User from "../models/userModel.js";

export const uploadPhoto = async (req, res) => {
  try {
    const { description, tags, type, category, orientation } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    if (!["photo", "illustration"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type.",
      });
    }

    let parsedTags = [];

    try {
      parsedTags = JSON.parse(tags);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid tags format.",
      });
    }

    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "lensflow",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadFromBuffer();

    const previewImage = result.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto,w_700,e_blur:40/",
    );

    const detailImage = result.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto,w_1600/",
    );

    const originalImage = result.secure_url;

    if (!result?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed.",
      });
    }

    await Photo.create({
      user: req.user._id,
      image: originalImage,
      previewImage: detailImage,
      cardImage: previewImage,
      publicId: result.public_id,
      type,
      category,
      orientation,
      tags: parsedTags,
      description,
    });

    return res.status(201).json({
      success: true,
      message: `${type} uploaded successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().populate("user", "-password");

    if (!photos) {
      return res.status(404).json({
        success: false,
        message: "Photos not found",
      });
    }

    return res.status(200).json({
      success: true,
      photos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSinglePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;

    const photo = await Photo.findById({ _id: photoId }).populate(
      "user",
      "-password",
    );

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    return res.status(200).json({
      success: true,
      photo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addViews = async (req, res) => {
  try {
    const { photoId } = req.params;

    let photo = await Photo.findById({ _id: photoId });

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    photo.views += 1;

    await photo.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPhotosByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const photos = await Photo.find({ category }).populate({
      path: "user",
      select: "-password"
    })

    if (!photos) {
      return res.status(404).json({
        success: false,
        message: "No photos found.",
      });
    }

    return res.status(200).json({
      success: true,
      photos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
