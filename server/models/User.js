const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://genvita.vn/resources/avatar/1157843c-1248-4960-b75e-df0031e903d6?width=119&height=119&mode=crop",
    },
    roleId: {
      type: String,
      default: "user",
    },
    background: {
      type: String,
      default:
        "https://media.istockphoto.com/photos/female-hiker-taking-picture-of-sunset-picture-id1137885437?b=1&k=20&m=1137885437&s=170667a&w=0&h=MHL07aCNhyljpmRqPH09YIXhmX1-fRvdjG4-Y76LlVM=",
    },
    description: {
      type: String,
      default: "This is description channel!",
    },
  },
  {
    timestamps: true,
  }
);

User.index({ name: "text" });
const userModel = mongoose.model("User", User);
userModel.createIndexes({ name: "text" });

module.exports = userModel;
