const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");
const {
  subsrciptionChannel,
  checkSubSubsrciption,
  unSubsrciption,
  getSubsrciption,
} = require("../controllers/subsrciptionControllers");

// GET
// get subsrciption count
route.get("/:channelId", getSubsrciption);

// POST
// Subsrciption channel
// Private
route.post("/", IsLogin, subsrciptionChannel);

// GET
// Check subsrciption
route.get("/check-sub/:channelId", IsLogin, checkSubSubsrciption);

// DELETE
// Unsub
// Private
route.delete("/:channelId", IsLogin, unSubsrciption);

module.exports = route;
