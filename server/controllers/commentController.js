const { response } = require("express");
const Comment = require("../models/Comment");

const postComment = async (req, res) => {
  try {
    const newCommnet = new Comment({
      ...req.body,
    });
    await newCommnet.save();
    const comment = await Comment.findOne({ _id: newCommnet._id }).populate(
      "userId"
    );
    return res.json({
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const deleteComment = async (req, res) => {
  const _id = req.params.id;
  try {
    const deleteComment = await Comment.findOneAndDelete({ _id });
    if (deleteComment) {
      return res.json({
        success: true,
        message: "Delete comment success!",
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

const getComment = async (req, res) => {
  const videoId = req.params.id;

  try {
    const comments = await Comment.find({ videoId }).populate(
      "userId",
      "-password"
    );
    return res.json({
      success: true,
      comments,
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
  postComment,
  deleteComment,
  getComment,
};
