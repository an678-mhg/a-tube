const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Video_Favourite = new Schema(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video_Favourite", Video_Favourite);
