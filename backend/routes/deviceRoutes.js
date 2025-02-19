const express = require("express");
const device = require("../controllers/deviceController");
const { authenticate } = require("../services/authService");
const router = express.Router();
router.route("/create").post(authenticate, device.createDevice);
router.route("/read").get(authenticate, device.getDevice);
router.route("/edit/:deviceId").patch(authenticate, device.editDevice);
router.route("/delete/:deviceId").delete(authenticate, device.removeDevice);
router
  .route("/deleteSharedDevice/:accessId")
  .delete(authenticate, device.removeSharedDevice);
module.exports = router;
