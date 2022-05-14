const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");
const verifyToken = require("../Middlewares/verifyJWT");

router.post("/", verifyToken, logoutController.handleLogout);

module.exports = router;
