const Subsrciption = require("../models/Subsrciption");

const subsrciptionChannel = async (req, res) => {
  try {
    const subsrciption = new Subsrciption({
      userId: req.userId,
      channelId: req.body.channelId,
    });

    await subsrciption.save();

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const checkSubSubsrciption = async (req, res) => {
  try {
    let isSubsrciption = false;

    const check = await Subsrciption.find({
      userId: req.userId,
      channelId: req.params.channelId,
    });

    if (check.length > 0) {
      isSubsrciption = true;
      return res.json({
        isSubsrciption,
      });
    }

    return res.json({
      isSubsrciption,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const unSubsrciption = async (req, res) => {
  try {
    const unSub = await Subsrciption.findOneAndDelete({
      userId: req.userId,
      channelId: req.params.channelId,
    });

    return res.json({
      success: true,
      message: "unsub success!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getSubsrciption = async (req, res) => {
  try {
    const subsrciptCount = await Subsrciption.find({
      channelId: req.params.channelId,
    });
    return res.json({
      success: true,
      subsrciptCount: subsrciptCount.length,
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
  subsrciptionChannel,
  checkSubSubsrciption,
  unSubsrciption,
  getSubsrciption,
};
