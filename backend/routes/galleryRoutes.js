const express = require('express');
const router = express.Router();
const { authenticate } = require('../services/authService');
const galleryController = require('../controllers/galleryController');
// router.route("/uploadImage").post(authenticate, galleryController.uploadImage);
router.route('/uploadImage').post(galleryController.uploadImage);
module.exports = router;
