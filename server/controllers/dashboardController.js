const User = require("../models/user.model");

const handleDashboard = async (req, res) => {
  try {
    const foundUser = await User.findOne({ id: req.id }, "-password").exec();
    if (!foundUser) {
      return res.status(404).json({ message: "User Not Found Sir!" });
    }  
    return res
      .status(200)
      .json({ message: "DashBoard Access Granted", user: foundUser });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
  
module.exports = { handleDashboard };
