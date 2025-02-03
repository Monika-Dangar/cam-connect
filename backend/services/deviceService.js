const deviceRepo = require("../repository/deviceRepo");
const accessRequestRepo = require("../repository/accessRequestRepo");
async function createDevice(deviceData) {
  const userDevice = await deviceRepo.createUserDevice(deviceData);

  if (userDevice) {
    return userDevice;
  }
}
async function readDevice(userId) {
  const deviceData = await Promise.all([
    deviceRepo.findDeviceByUserId(userId),
    accessRequestRepo.findDeviceSharedWithMe(userId),
    accessRequestRepo.findDeviceSharedWithOthers(userId),
  ]);
  return deviceData;
}

async function updateDevice(newDeviceData) {
  const updatedDevice = await deviceRepo.updateDevice(
    newDeviceData.deviceId,
    newDeviceData
  );
  if (updatedDevice) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
    };
  }
}
async function deleteDevice(deviceId) {
  const deleteDevice = await Promise.all([
    deviceRepo.deleteDeviceById(deviceId),
    accessRequestRepo.deleteLinkedDevice(deviceId),
  ]);

  if (deleteDevice) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
    };
  }
}
async function deleteSharedDevice(accessId) {
  const deletedSharedDevice = await accessRequestRepo.deleteSharedDevice(
    accessId
  );

  if (deletedSharedDevice) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
    };
  }
}
module.exports = {
  createDevice,
  readDevice,
  updateDevice,
  deleteDevice,
  deleteSharedDevice,
};
