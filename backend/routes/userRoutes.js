const express = require("express");
const router = express.Router();
const { handleCreateUser } = require("../controllers/signupController");
const { handleLoginUser } = require("../controllers/loginController");
const { hashPassword } = require("../middlerwares/passwordHashing");
const {
  passwordVerification,
} = require("../middlerwares/passwordVerification");

router.route("/signup").post(hashPassword, handleCreateUser);

router.route("/login").post(passwordVerification, handleLoginUser);

module.exports = router;
