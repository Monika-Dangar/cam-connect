const cameraRepo = require('../repository/cameraRepo');

async function requestToAccessDevice(requesterId, ownerId, deviceId) {
  try {
    const response = await cameraRepo.findIsRequestExist(requesterId, ownerId, deviceId);

    if (response) {
      return response;
    }

    const data = {
      ownerId: ownerId,
      requesterId: requesterId,
      deviceId: deviceId,
      isActive: true,
      status: 'pending',
    };

    const accessApproved = await cameraRepo.createRequestToAccessDevice(data);

    if (accessApproved) {
      return accessApproved;
    }
  } catch (error) {}
}

async function findDevicesByUsername(usernameRegex) {
  const usersFound = await cameraRepo.findByUsername(usernameRegex);

  if (usersFound.length == 0) {
    return;
  }

  let userData = {};

  for (const curr of usersFound) {
    userData[curr.username] = {
      user: curr,
      devices: [],
    };

    const deviceFound = await cameraRepo.findDevicesByUserIds(curr._id);
    if (deviceFound) {
      userData[curr.username].devices.push(deviceFound);
    }
  }

  userData = Object.values(userData);

  return userData;
}

async function getApprovedDevice(userId) {
  const response = await cameraRepo.getApprovedDevice(userId);
  if (!response) {
    return;
  }
  return response;
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
  const response = await cameraRepo.allowAccessToDevice(ownerId, requesterId, deviceId);

  if (!response) {
    return;
  }

  return response;
}

async function deniedAccessToDevice(ownerId, requesterId, deviceId) {
  const response = await cameraRepo.deniedAccessToDevice(ownerId, requesterId, deviceId);

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
