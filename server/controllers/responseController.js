const path = require("path");

const handleResponse = (req, res) => {
  console.log("Reached Here!!", req.params);
  res.sendFile(path.join(__dirname, "./../views/verify.html"));
};

module.exports = { handleResponse };
 