const Video = require("../models/Video");
const Video_Favourite = require("../models/Video_Favourite");

const addVideoFavourite = async (req, res) => {
  const userId = req.userId;
  const videoId = req.body.videoId;

  try {
    const checkVideoExits = await Video_Favourite.find({ userId, videoId });
    if (checkVideoExits.length > 0) {
      return res.json({
        success: false,
        message: "Video exists!",
      });
    }
    const newVideoFavourite = new Video_Favourite({
      videoId,
      userId,
    });
    await newVideoFavourite.save();

    const video = await Video.findOne({
      _id: newVideoFavourite.videoId,
    }).populate("writer");
    return res.json({
      success: true,
      message: "Add new video favourite success!",
      video,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getVideoFavourite = async (req, res) => {
  const userId = req.userId;

  try {
    const video_favourite = await Video_Favourite.find({ userId }).sort(
      "-createdAt"
    );

    const videoArray = [];
    video_favourite.forEach((p) => {
      videoArray.push(p.videoId);
    });

    const videos = await Video.find({ _id: { $in: videoArray } }).populate(
      "writer"
    );

    return res.json({
      success: true,
      videos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const deleteVideoFavourite = async (req, res) => {
  const userId = req.userId;
  const videoId = req.params.videoId;

  try {
    const deleteVideo = await Video_Favourite.findOneAndDelete({
      videoId,
      userId,
    });
    if (deleteVideo) {
      return res.json({
        success: true,
        message: "Delete video favourite success!",
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

module.exports = {
  addVideoFavourite,
  getVideoFavourite,
  deleteVideoFavourite,
};
