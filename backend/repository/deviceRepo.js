const Device = require("../models/cameraSchema");
const accessRequest = require("../models//accessRequestSchema");
function createUserDevice(data) {
  try {
    const device = new Device(data);
    return device.save();
  } catch (error) {
    console.log("Error creating device", error);
    return null;
  }
}
function findDeviceByUserId(userId) {
  return Device.find({ userId });
}
function findSharedDevice(requesterId) {
  return accessRequest
    .find({ requesterId, status: "approved" })
    .populate({
      path: "deviceId",
      select: "deviceName deviceLocation deviceType",
    })
    .populate({
      path: "ownerId",
      select: "username",
    })
    .select({ _id: 0, deviceId: 1, ownerId: 1 });
}
function findDeviceById(deviceId) {
  return Device.findById({ _id: deviceId }).select(
    "deviceName deviceLocation deviceType -_id"
  );
}
function updateDevice(deviceId, newDeviceData) {
  return Device.findByIdAndUpdate(
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
  return Device.findByIdAndDelete(_id);
}
module.exports = {
  createUserDevice,
  findDeviceByUserId,
  findSharedDevice,
  findDeviceById,
  updateDevice,
  deleteDeviceById,
};
