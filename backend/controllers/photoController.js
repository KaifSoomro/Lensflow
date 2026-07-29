import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import Photo from "../models/photoModel.js";

export const uploadPhoto = async (req, res) => {
  try {
    const { description, tags, type } = req.body;

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

    if (!result?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed.",
      });
    }

    await Photo.create({
      user: req.user._id,
      image: result.secure_url,
      publicId: result.public_id,
      type,
      tags: parsedTags,
      description,
    });

    return res.status(201).json({
      success: true,
      message: `${type} uploaded successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
