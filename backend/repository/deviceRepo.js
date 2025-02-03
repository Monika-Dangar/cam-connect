const device = require("../models/cameraSchema");
function createUserDevice(data) {
  try {
    const deviceData = new device(data);
    return deviceData.save();
  } catch (error) {
    console.log("Error creating device", error);
    return null;
  }
}
function findDeviceByUserId(userId) {
  return device.find({ userId });
}

function updateDevice(deviceId, newDeviceData) {
  return device.findByIdAndUpdate(
    { _id: deviceId },
    {
      $set: {
        deviceName: newDeviceData.deviceName,
        deviceLocation: newDeviceData.deviceLocation,
        deviceType: newDeviceData.deviceType,
      },
    },
    { new: true }
  );
}
function deleteDeviceById(_id) {
  return device.findByIdAndDelete(_id);
}
module.exports = {
  createUserDevice,
  findDeviceByUserId,
  updateDevice,
  deleteDeviceById,
};
