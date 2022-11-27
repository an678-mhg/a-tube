const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subsrciption = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subsrciption", Subsrciption);
