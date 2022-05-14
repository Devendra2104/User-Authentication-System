const express = require("express");
const router = express.Router();
const verifyJWt = require("../Middlewares/verifyJWT");
const dashboardController = require("../controllers/dashboardController");

router.get("/", verifyJWt, dashboardController.handleDashboard);

module.exports = router;
