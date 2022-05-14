const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) {
    res.status(401).json({ message: "You have not Register Sir!" });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res
      .status(401)
      .json({ message: "Sir Password didn't matched with our database User" });
  }
  // give this user his accessToken
  const token = jwt.sign({ id: foundUser._id }, process.env.accessTokenSecret, {
    expiresIn: "30s",
  });
  // console.log("Generated Token\n", token);

  if (req.cookies[`${foundUser._id}`]) {
    req.cookies[`${foundUser._id}`] = "";
  }
  res.cookie(String(foundUser._id), token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 30),
  });
  return res
    .status(200)
    .json({ message: "Successfully Logged In", token: token });
};

module.exports = { handleLogin };
