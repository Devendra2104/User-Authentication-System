const express = require("express");
const router = express.Router();
const responseController = require("../controllers/responseController.js");

router.get("/:error&:message", responseController.handleResponse);

module.exports = router;
