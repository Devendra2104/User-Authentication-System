const User = require("../models/user.model");
const UserVerification = require("../models/userVerfication.modal");
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.auth_email,
    pass: process.env.auth_pass,
  },
});

transporter.verify((err, succ) => {
  if (err) {
    console.log(err);
  } else {
    console.log(succ);
  }
});

const sendVerificationEmail = async (newUser, res) => {
  const { _id, email } = newUser;
  const mailOptions = {
    from: process.env.auth_email,
    to: email,
    subject: "Verify Your Email",
    html: `
      <p> Verify Your Email Address to complete the sign Up and login into your Account Sir! </p>
      <p> This link expires in <b> 10 min </b> </p>
      <p>
        Press 
        <a href=${"http://localhost:5000/verify/" + _id + "/"}>
        Here
        </a>
      </p>
    `,
  };
  try {
    const newVerificationUser = await UserVerification.create({
      userId: _id,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });
    console.log(newVerificationUser);
    try {
      const result = await transporter.sendMail(mailOptions);
      console.log(result);
      res.status(200).json({
        status: "Pending",
        message: "Verification Email sent!",
        userInfo: newUser,
      });
    } catch (err) {
      console.log("In the SendEmailFunction", err);
      res.json({
        status: "Failed",
        message: "Verification Email Failed",
      });
    }
  } catch (err) {
    console.log("In the SendEmailFunction", err);
    res.json({
      status: "Failed",
      message: "Couldn't Save Verification Email data!",
    });
  }
};

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
      verified: false,
    });
    console.log(newUser);
    try {
      await sendVerificationEmail(newUser, res);
    } catch (err) {
      console.log(err);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
  next();
};

module.exports = { handleSignUp };
