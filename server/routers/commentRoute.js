const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");
const {
  postComment,
  deleteComment,
  getComment,
} = require("../controllers/commentController");

// POST
// post comment
route.post("/", IsLogin, postComment);

// DELETE
// delete comment
route.delete("/:id", IsLogin, deleteComment);

// GET
// get comment
route.get("/:id", getComment);

module.exports = route;
