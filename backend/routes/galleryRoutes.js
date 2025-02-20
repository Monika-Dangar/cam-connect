const express = require("express");
const router = express.Router();
const { authenticate } = require("../services/authService");
const galleryController = require("../controllers/galleryController");
router.route("/image").post(authenticate, galleryController.uploadImage); //to uploadImage
//to get image of particular device send deviceid in body
router
  .route("/deviceImages")
  .post(authenticate, galleryController.getDeviceImage);
router
  .route("/filteredImages")
  .post(authenticate, galleryController.getAllImage);
module.exports = router;
