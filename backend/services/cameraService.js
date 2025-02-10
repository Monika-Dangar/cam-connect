const cameraRepo = require("../repository/cameraRepo");
const userRepo = require("../repository/userRepo");
const deviceRepo = require("../repository/deviceRepo");

async function requestToAccessDevice(deviceId, requesterId) {
  try {
    const response = await cameraRepo.findCameraById(deviceId);

    if (!response.userId) {
      return;
    }

    const resp = await cameraRepo.requestExistsOrNot(requesterId, response._id);

    if (resp) {
      return resp;
    }

    const data = {
      ownerId: response.userId,
      requesterId: requesterId,
      deviceId: response._id,
      isActive: true,
      status: "pending",
    };

    const accessApproved = await cameraRepo.createRequestToAccessDevice(data);

    if (accessApproved) {
      return accessApproved;
    }
  } catch (error) {}
}

async function findDevicesByUsername(username) {
  const userFound = await userRepo.findByUsername(username);
  console.log(userFound);
  if (!userFound) {
    return;
  }

  const devicesFound = await deviceRepo.findDeviceByUserId(userFound._id);
  if (!devicesFound) {
    return;
  }

  return devicesFound;
}

async function getApprovedDevice(userId) {
  const response = await cameraRepo.getApprovedDevice(userId);
  if (!response) {
    return;
  }
  return response;
}

async function getDeniedDevice(userId) {
  const response = await cameraRepo.removeDeniedRequest(userId);
  if (!response) {
    return;
  }

  return response;
}

async function removeDeniedRequest(requestId) {
  const response = await cameraRepo.removeDeniedRequest(requestId);
  if (!response) {
    return;
  }

  return response;
}

async function pendingRequests(ownerId) {
  const response = await cameraRepo.getPendingRequests(ownerId);

  if (!response) {
    return;
  }

  return response;
}

async function allowAccessToDevice(ownerId, requesterId, deviceId) {
  const response = await cameraRepo.allowAccessToDevice(
    ownerId,
    requesterId,
    deviceId
  );

  if (!response) {
    return;
  }

  return response;
}

async function deniedAccessToDevice(ownerId, requesterId, deviceId) {
  const response = await cameraRepo.deniedAccessToDevice(
    ownerId,
    requesterId,
    deviceId
  );

  if (!response) {
    return;
  }

  return response;
}

module.exports = {
  requestToAccessDevice,
  findDevicesByUsername,
  getApprovedDevice,
  getDeniedDevice,
  removeDeniedRequest,
  pendingRequests,
  allowAccessToDevice,
  deniedAccessToDevice,
};
