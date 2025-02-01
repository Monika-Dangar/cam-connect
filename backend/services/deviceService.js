const deviceRepo = require("../repository/deviceRepo");
async function createDevice(deviceData) {
  const userDevice = await deviceRepo.createUserDevice(deviceData);

  if (userDevice) {
    return { success: true };
  } else {
    return { success: false, message: "Error creating device" };
  }
}
async function readDevice(userId) {
  const deviceData = await Promise.all([
    deviceRepo.findDeviceByUserId(userId),
    deviceRepo.findSharedDevice(userId),
    deviceRepo.findDeviceSharedWithOthers(userId),
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
      message: `Device updated successfully ${updatedDevice}`,
    };
  } else {
    return {
      success: false,
      message: `Error updating device ${updatedDevice}`,
    };
  }
}
async function deleteDevice(deviceId) {
  const deletedDevice = await deviceRepo.deleteDeviceById(deviceId);
  if (deletedDevice) {
    return {
      success: true,
      message: "Device deleted successfully",
    };
  } else {
    return {
      success: false,
      message: "Device not found ",
    };
  }
}
async function deleteSharedDevice(accessId) {
  const deletedSharedDevice = await deviceRepo.deleteSharedDevice(accessId);

  if (deletedSharedDevice) {
    return {
      success: true,
      message: "Shared device deleted",
    };
  } else {
    return {
      success: false,
      message: "Device not shared ",
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
