const express = require("express");
const router = express.Router();
const verifyController = require("../controllers/verifyController.js");

router.get("/:reqUserId", verifyController.handleVerify);

module.exports = router;
