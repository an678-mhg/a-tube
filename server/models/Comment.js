const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    content: {
      type: String,
      required: true,
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
