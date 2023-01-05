const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({
        success: false,
        message: "Missing paramaters!",
      });

    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(400).json({
        success: false,
        message: "Email existing!",
      });

    const hashPassword = await argon2.hash(password);

    const newUser = new User({
      email,
      name,
      password: hashPassword,
      roleId: "user",
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        roleId: newUser.roleId,
      },
      process.env.PASSJWT,
      { expiresIn: "12h" }
    );

    return res.status(203).json({
      success: true,
      message: "Register success!",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Missing paramaters!",
      });

    const findUser = await User.findOne({ email });

    if (!findUser)
      return res.status(400).json({
        success: false,
        message: "User not exits!",
      });

    const checkPass = await argon2.verify(findUser.password, password);
    if (!checkPass)
      return res.status(400).json({
        success: false,
        message: "Password was wrong!",
      });

    const token = jwt.sign(
      {
        userId: findUser._id,
        roleId: findUser.roleId,
      },
      process.env.PASSJWT,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login success!",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getUser = async (req, res) => {
  const userId = req.userId;

  try {
    const userInfo = await User.findById(userId).select("-password");
    if (userInfo)
      return res.status(200).json({
        success: true,
        user: userInfo,
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
  registerUser,
  loginUser,
  getUser,
};
