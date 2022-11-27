const express = require("express");
const route = express.Router();
const {
  getChannelInfo,
  getChannelVideo,
  updateChannel,
  searchChannel,
  getChannelSubsrciption,
} = require("../controllers/channelControllers");
const IsLogin = require("../middleware/IsLogin");

// GET
// get info channel
route.get("/:id", getChannelInfo);

// GET
// get videos channel
route.get("/video/:id", getChannelVideo);

// PUT
// update channel
route.put("/user", IsLogin, updateChannel);

// GET
// search channel keyword
route.get("/search/multi", searchChannel);

// GET
// get channel subsrciption
route.get("/sub/resgisted", IsLogin, getChannelSubsrciption);

module.exports = route;
