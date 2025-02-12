const express = require('express');
const router = express.Router();
const { authenticate } = require('../services/authService');
const camera = require('../controllers/cameraController');

router.route('/approvedRequest').get(authenticate, camera.getApprovedDevice);

router.route('denyAccess').post(authenticate, camera.deniedAccessToDevice);

router
  .route('/pendingRequest')
  .get(authenticate, camera.getPendingRequest)
  .put(authenticate, camera.allowAccessToDevice);

router
  .route('/notificationBar')
  .get(authenticate, camera.getDeniedDevice)
  .delete(authenticate, camera.removeDeniedRequest);

router.route('/searchBar/:username').get(authenticate, camera.findDevicesByUsername);

router.route('/searchBar').post(authenticate, camera.requestToAccessDevice);

module.exports = router;
