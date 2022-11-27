const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers");

// POST
// Register user
// Public
// api/user/register
route.post("/register", registerUser);

// POST
// Login user
// Public
// api/user/login
route.post("/login", loginUser);

// GET
// User Info
// Private
// api/user
route.get("/", IsLogin, getUser);

module.exports = route;
