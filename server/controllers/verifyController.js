const UserVerification = require("../models/userVerfication.modal");
const User = require("../models/user.model");

const handleVerify = async (req, res, next) => {
  let { reqUserId } = req.params;
  console.log(reqUserId);
  try {
    const foundUser = await UserVerification.findOne({ reqUserId }).exec();
    console.log(foundUser);
    if (!foundUser) {
      let message = "Please Sign up Sir!";
      res.redirect(`/response/error=true&message=${message}`);
      return;
    }
    const { expiresAt, userId } = foundUser;
    if (expiresAt < Date.now()) {
      try {
        const yt = await UserVerification.deleteOne({ reqUserId });
        console.log(yt);
        try {
          const deletedUser = await User.deleteOne({ _id: reqUserId });
          console.log(deletedUser);
          let message = "Link has been Expired Sir. Please Sign Up Again";
          res.redirect(`/response/error=true&message=${message}`);
        } catch (err) {
          console.log("Error 3", err);
          let message = "Clearing user from User Database Falied Sir!";
          res.redirect(`/response/error=true&message=${message}`);
        }
      } catch (err) {
        console.log("Error 1", err);
        let message =
          "Clearing user from UserVerification Database Falied Sir!";
        res.redirect(`/response/error=true&message=${message}`);
      }
    } else {
      // it is valid
      console.log(reqUserId, userId);
      if (reqUserId === userId) {
        // yeah it is correct
        try {
          const up = await User.updateOne(
            { _id: reqUserId },
            { $set: { verified: true } }
          );
          console.log(up);
          try {
            const deleteUser = await UserVerification.deleteOne({
              reqUserId,
            });
            console.log(deleteUser);
            let message = "Yay!";
            res.redirect(`/response/error=false&message=${message}`);
          } catch (err) {
            console.log("Error 6", err);
            let message = "Cant delete User";
            res.redirect(`/response/error=true&message=${message}`);
          }
        } catch (err) {
          console.log("Error 5", err);
          let message = "Error Occurred While updating User database";
          res.redirect(`/response/error=true&message=${message}`);
        }
      } else {
        let message = "Id's didn't matched Sir!";
        res.redirect(`/response/error=true&message=${message}`);
      }
    }
  } catch (err) {
    console.log("Error 2", err);
    let message = "No UserVerification Data Present of this user Sir!";
    res.redirect(`/response/error=true&message=${message}`);
  }
  next();
};

module.exports = { handleVerify };
