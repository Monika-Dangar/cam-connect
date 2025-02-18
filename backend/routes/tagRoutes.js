const express = require("express");
const { authenticate } = require("../services/authService");
const router = express.Router();
const tagController = require("../controllers/tagController");
router
  .route("/handleTag")
  .post(authenticate, tagController.addTag)
  .delete(authenticate, tagController.removeTag)
  .get(authenticate, tagController.getTag);
module.exports = router;
