const express = require("express");
const { authenticate } = require("../services/authService");
const router = express.Router();
const tagController = require("../controllers/tagController");
router
  .route("/handleTag")
  .post(authenticate, tagController.addTag) //adds tag to particular image (every image have unique tag)
  .delete(authenticate, tagController.removeTag); //remove a tag of particular image require:tagId

router
  .route("/tagOfParticularImage")
  .post(authenticate, tagController.getTagOfParticularImage);
router.route("/allTags").get(authenticate, tagController.getMaxUsedTags);
module.exports = router;
