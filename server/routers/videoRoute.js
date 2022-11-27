const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");
const {
  getAllVideos,
  addNewVideo,
  getVideoById,
  likeVideo,
  checkLikeVideo,
  unLikeVideo,
  disLikeVideo,
  checkDisLikeVideo,
  unDisLikeVideo,
  getVideoSubsrciption,
  descView,
  getTrendingVideo,
  searchVideo,
  getLikeVideo,
  editVideo,
  deleteVideo,
} = require("../controllers/videoControllers");

// GET
// Get all video
// Public
route.get("/", getAllVideos);

// POSt
// create video
// Private
route.post("/", IsLogin, addNewVideo);

// GET
// get video by id
// Public
route.get("/:id", getVideoById);

// POST
// like video
// private
route.post("/like", IsLogin, likeVideo);

// GET
// check like
// private
route.get("/like/check-like/:videoId", IsLogin, checkLikeVideo);

// DELETE
// unlike
// private
route.delete("/un-like/:videoId", IsLogin, unLikeVideo);

// POST
// dislike video
// private
route.post("/dislike", IsLogin, disLikeVideo);

// GET
// check dislike
// private
route.get("/dislike/check-dislike/:videoId", IsLogin, checkDisLikeVideo);

// DELETE
// unlike
// private
route.delete("/un-dislike/:videoId", IsLogin, unDisLikeVideo);

// GET
// get video subsrciption
// private
route.get("/subsrciption/video-subsrciption", IsLogin, getVideoSubsrciption);

// PUT
// Desc view
route.put("/desc-view/:videoId", descView);

// GET
// trending video
route.get("/xu-huong/trending", getTrendingVideo);

// GET
// Search video
route.get("/multi/search", searchVideo);

// GET
// get liked video
// Private
route.get("/me/like-video", IsLogin, getLikeVideo);

// PUT
// edit video
route.put("/:id", IsLogin, editVideo);

// DELETE
// delete video
route.delete("/:id", IsLogin, deleteVideo);

module.exports = route;
