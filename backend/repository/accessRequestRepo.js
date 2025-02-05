const accessRequest = require("../models/accessRequestSchema");
function findDeviceSharedWithMe(requesterId) {
  return accessRequest
    .find({ requesterId, status: "approved" })
    .populate({
      path: "deviceId",
      select: "deviceName deviceLocation deviceType imeiNumber",
    })
    .populate({
      path: "ownerId",
      select: "username",
    })
    .select({ deviceId: 1, ownerId: 1 });
}
function findDeviceSharedWithOthers(ownerId) {
  return accessRequest
    .find({ ownerId, status: "approved" })
    .populate({
      path: "deviceId",
      select: "deviceName deviceLocation deviceType",
    })
    .populate({
      path: "requesterId",
      select: "username",
    })
    .select("deviceId requesterId ");
}
function deleteSharedDevice(_id) {
  return accessRequest.findByIdAndDelete(_id);
}
function deleteLinkedDevice(deviceId) {
  return accessRequest.deleteMany({ deviceId });
}
module.exports = {
  findDeviceSharedWithMe,
  findDeviceSharedWithOthers,
  deleteSharedDevice,
  deleteLinkedDevice,
};
