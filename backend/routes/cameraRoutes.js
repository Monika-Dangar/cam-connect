const express = require("express");
const router = express.Router();
const { authenticate } = require("../services/authService");
const camera = require("../controllers/cameraController");

router.route("/approvedRequest").get(authenticate, camera.getApprovedDevice);

// router.route('/notificationBar').get(camera.getDeniedDevice).delete(camera.removeDeniedRequest);

// router.route('/searchBar').post(camera.requestToAccessDevice).get(camera.findDevicesByUsername);

router
  .route("/approvedRequest")
  .get(authenticate, camera.getApprovedDevice)
  .post(authenticate, camera.deniedAccessToDevice);

router
  .route("/pendingRequest")
  .get(authenticate, camera.getPendingRequest)
  .put(authenticate, camera.allowAccessToDevice);

router
  .route("/notificationBar")
  .get(authenticate, camera.getDeniedDevice)
  .delete(authenticate, camera.removeDeniedRequest);

<<<<<<< HEAD
router
  .route("/searchBar/:username")
  .post(authenticate, camera.requestToAccessDevice)
  .get(authenticate, camera.findDevicesByUsername);
=======
router.route('/searchBar/:username').get(authenticate, camera.findDevicesByUsername);

router.route('/searchBar').post(authenticate, camera.requestToAccessDevice);
>>>>>>> b01a24f223d7c180fa81a8b5aff2c113be5dae84

module.exports = router;
