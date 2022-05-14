const express = require("express");
const { handleDashboard } = require("../controllers/dashboardController");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");
const verifyToken = require("../Middlewares/verifyJWT");

router.get(
  "/",
  refreshTokenController.handleRefresh,
  verifyToken,
  handleDashboard
);

module.exports = router;
