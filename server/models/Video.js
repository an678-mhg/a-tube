const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Video = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoThumnail: {
      type: String,
    },
    totalView: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

Video.index({ title: "text" });
const VideoModels = mongoose.model("Video", Video);
VideoModels.createIndexes({ title: "text" });

module.exports = VideoModels;
