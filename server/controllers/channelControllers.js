const Subsrciption = require("../models/Subsrciption");
const User = require("../models/User");
const Video = require("../models/Video");

const getChannelInfo = async (req, res) => {
  const channelId = req.params.id;

  try {
    const channel = await User.findOne({ _id: channelId }).select("-password");
    if (!channel) {
      return res.status(400).json({
        success: false,
        message: "Channel not found!",
      });
    }

    return res.json({
      success: true,
      channel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getChannelVideo = async (req, res) => {
  const channelId = req.params.id;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 4;
  const skip = (page - 1) * limit;

  try {
    const total = await Video.countDocuments({ writer: channelId });
    const videos = await Video.find({ writer: channelId })
      .skip(skip)
      .limit(limit)
      .populate("writer")
      .sort("-createdAt");
    return res.json({
      success: true,
      videos,
      totalPage: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const updateChannel = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findOne({ _id: userId });
    if (user._id == userId) {
      await User.findOneAndUpdate({ _id: userId }, { ...req.body });
      return res.json({
        success: true,
        channel: req.body,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to edit this channel!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const searchChannel = async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm.trim())
    return res.status(400).json({
      success: false,
      message: "Missing parameters!",
    });

  try {
    const textReg = new RegExp(searchTerm, "i");
    const results = await User.find({
      name: textReg,
    });
    return res.json({
      success: true,
      results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getChannelSubsrciption = async (req, res) => {
  const userId = req.userId;

  try {
    const subsrciption = await Subsrciption.find({ userId })
      .populate("channelId")
      .sort("createdAt");
    return res.json({
      success: true,
      subsrciption,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

module.exports = {
  getChannelInfo,
  getChannelVideo,
  updateChannel,
  searchChannel,
  getChannelSubsrciption,
};
