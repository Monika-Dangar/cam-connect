const express = require("express");
const router = express.Router();
const { authenticate } = require("../services/authService");
const galleryController = require("../controllers/galleryController");
router
  .route("/image")
  .post(authenticate, galleryController.uploadImage) //to uploadImage
  .get(authenticate, galleryController.getDeviceImage); //to get image of particular device send deviceid in body

router.route("/getAllImage").get(authenticate, galleryController.getAllImage);
module.exports = router;
