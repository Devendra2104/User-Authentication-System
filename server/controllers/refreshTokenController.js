const jwt = require("jsonwebtoken");

const handleRefresh = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't Find Token Sir!" });
  }
  jwt.verify(
    String(prevToken),
    process.env.accessTokenSecret,
    (err, decode) => {
      if (err) { 
        console.log(err);
        return res
          .status(403)
          .json({ message: err, status: "Authentication Falied" });
      }
      res.clearCookie(`${decode.id}`, { httpOnly: true });
      req.cookies[`${decode.id}`] = "";

      const token = jwt.sign({ id: decode.id }, process.env.accessTokenSecret, {
        expiresIn: "30s",
      });

      // console.log("Regenerated Token\n", token);

      res.cookie(String(decode.id), token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      });
      req.id = decode.id;
    }
  );
  next();
};

module.exports = { handleRefresh };
