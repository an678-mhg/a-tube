const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");
const {
  addVideoFavourite,
  getVideoFavourite,
  deleteVideoFavourite,
} = require("../controllers/favouriteControllers");

// POST
// add favourite video
// Private
route.post("/", IsLogin, addVideoFavourite);

// GET
// Get favourite video
// Private
route.get("/", IsLogin, getVideoFavourite);

// DELETE
// delete favourite video
// Private
route.delete("/:videoId", IsLogin, deleteVideoFavourite);

module.exports = route;
