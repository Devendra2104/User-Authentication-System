const jwt = require("jsonwebtoken");

const handleLogout = async (req, res) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't Find the Token Sir!" });
  }
  jwt.verify(
    String(prevToken),
    process.env.accessTokenSecret,
    (err, decode) => {
      if (err) {
        res.status(403).json({ message: "Authentication Failed !" });
      }
      res.clearCookie(`${decode.id}`);
      console.log(req.cookies);
      req.cookies[`${decode.id}`] = "";
      return res.status(200).json({ message: "SuccessFully Logged Out" });
    }
  );
};

module.exports = { handleLogout };
