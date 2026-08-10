import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
