const handleHome = async (req, res, next) => {
  res.send("This is Home");
  next();
};

module.exports = { handleHome };
