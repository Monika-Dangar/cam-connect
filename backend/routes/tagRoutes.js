const express = require("express");
const { authenticate } = require("../services/authService");
const router = express.Router();
router.route("/tag").post(authenticate).delete(authenticate).get(authenticate);
module.exports = router;
