const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const handleSignUp = async (req, res, next) => {
  const { userName, password, email } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "UserName and Password are Required!" });
  }
  const duplicate = await User.findOne({ userName: userName }).exec();
  if (duplicate) res.sendStatus(409); // Conflict
  const hashPwd = await bcrypt.hash(password, 10);
  console.log(userName, email, password);
  try {
    const newUser = await User.create({
      userName,
      email,
      password: hashPwd,
    });
    console.log(newUser);
    res.status(201).json({
      success: "true",
      message: "User Created Successfully",
      userInfo: newUser,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
  next();
};

module.exports = { handleSignUp };
