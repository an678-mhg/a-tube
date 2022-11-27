// App
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routers
const userRoute = require("../routers/userRoute");
const videoRoute = require("../routers/videoRoute");
const subsrciptionRoute = require("../routers/subsrciptionRoute");
const favouriteRoute = require("../routers/video_favouriteRoute");
const channelRoute = require("../routers/channelRoute");
const commentRoute = require("../routers/commentRoute");

const app = express();
const URLDB = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORDMONGO}@youtube-clone.skcs0.mongodb.net/youtube-clone?retryWrites=true&w=majority`;

// connectDB
const connectDB = async () => {
  try {
    await mongoose.connect(URLDB);
    console.log("connect DB success!");
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
};

connectDB();

// config body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello word");
});

// config route
app.use("/api/user", userRoute);
app.use("/api/video", videoRoute);
app.use("/api/sub", subsrciptionRoute);
app.use("/api/favourite", favouriteRoute);
app.use("/api/channel", channelRoute);
app.use("/api/comment", commentRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}!`);
});
