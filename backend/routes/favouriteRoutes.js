const express = require("express");
const { authenticate } = require("../services/authService");
const router = express.Router();
const favouriteController = require("../controllers/favouriteController");
router
  .route("/handlefavourite")
  .post(authenticate, favouriteController.handleFavourite)
  .get(authenticate, favouriteController.getFavourite);

module.exports = router;
