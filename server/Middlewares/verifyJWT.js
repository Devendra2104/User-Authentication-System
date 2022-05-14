const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // const headers = req.headers[`authorization`];
  // const token = headers.split("Bearer ")[1];
  const Cookie = req.headers.cookie;
  const token = Cookie.split("=")[1];
  // console.log("Token Value =  ", token);
  if (!token) {
    return res.status(404).json({ message: "Token is Missing Sir!" });
  }
  jwt.verify(token, process.env.accessTokenSecret, (err, decode) => {
    if (err) {
      return res.status(400).json({
        message: err,
        status: "Either Invalid Token Sir! or it has expired",
      });
    }
    req.id = decode.id;
  });
  next();
};

module.exports = verifyToken;
