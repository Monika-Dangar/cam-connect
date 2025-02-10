const express = require('express');
const router = express.Router();
const { authenticate } = require('../services/authService');
const camera = require('../controllers/cameraController');

// router.route('/approvedRequest').get(camera.getApprovedDevice).post(camera.deniedAccessToDevice);

// router
//   .route('/pendingRequest')
//   .get(camera.getPendingRequest)
//   .put(camera.allowAccessToDevice)
//   .post(camera.deniedAccessToDevice);

// router.route('/notificationBar').get(camera.getDeniedDevice).delete(camera.removeDeniedRequest);

// router.route('/searchBar').post(camera.requestToAccessDevice).get(camera.findDevicesByUsername);

router
  .route('/approvedRequest')
  .get(authenticate, camera.getApprovedDevice)
  .post(authenticate, camera.deniedAccessToDevice);

router
  .route('/pendingRequest')
  .get(authenticate, camera.getPendingRequest)
  .put(authenticate, camera.allowAccessToDevice)
  .post(authenticate, camera.deniedAccessToDevice);

router
  .route('/notificationBar')
  .get(authenticate, camera.getDeniedDevice)
  .delete(authenticate, camera.removeDeniedRequest);

router
  .route('/searchBar')
  .post(authenticate, camera.requestToAccessDevice)
  .get(authenticate, camera.findDevicesByUsername);

module.exports = router;
