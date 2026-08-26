import mongoose from "mongoose";

const downloadsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    downloadedPhotos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo",
      },
    ]
  },
  {
    timestamps: true,
  },
);

const Downloads = mongoose.model("Download", downloadsSchema);

export default Downloads;
