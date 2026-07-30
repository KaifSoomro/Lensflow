import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    cardImage: {
      type: String,
      required: true,
    },
    
    previewImage: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["photo", "illustration"],
      default: "photo",
      required: true
    },

    category: {
      type: String,
      enum: [
        "featured",
        "illustrations",
        "collections",
        "nostalgia",
        "summer",
        "wallpapers",
        "3d-renders",
        "nature",
        "texture",
        "film",
        "street-photography",
      ],
      default: "featured",
      required: true
    },

    orientation: {
      type: String,
      enum: ["landscape", "portrait", "square"],
      default: "portrait",
      required: true
    },

    tags: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    downloads: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
