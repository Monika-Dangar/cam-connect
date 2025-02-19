const device = require("../models/cameraSchema");
const accessRequestSchema = require("../models/accessRequestSchema");
const User = require("../models/userSchema");
const enumStatus = require("../utils/enumStatus").default;

function findIsRequestExist(requesterId, ownerId, deviceId) {
  return accessRequestSchema.findOneAndUpdate(
    {
      ownerId: ownerId,
      requesterId: requesterId,
      deviceId: deviceId,
      status: enumStatus.deniedStatus,
      isActive: true,
    },
    { status: enumStatus.pendingStatus },
    { new: true }
  );
}

function findByUsername(usernameRegex) {
  return User.find({ username: usernameRegex });
}

function findDevicesByUserIds(userIds) {
  return device.find({ userId: { $in: userIds } });
}

function requestExistsOrNot(requesterId, deviceId) {
  return accessRequestSchema.find({
    requesterId: requesterId,
    deviceId: deviceId,
    isActive: true,
  });
}

function getApprovedDevice(userId) {
  return accessRequestSchema
    .find({
      ownerId: userId,
      status: enumStatus.approvedStatus,
    })
    .populate("deviceId")
    .populate("requesterId");
}

function getDeniedDevice(userId) {
  return accessRequestSchema
    .find({
      requesterId: userId,
      status: enumStatus.deniedStatus,
      isActive: true,
    })
    .populate("deviceId")
    .populate("ownerId");
}

function removeDeniedRequest(requesterId, deviceId) {
  return accessRequestSchema.deleteOne({ requesterId, deviceId });
}

function createRequestToAccessDevice(data) {
  const resp = new accessRequestSchema(data);
  return resp.save();
}

function getPendingRequests(ownerId) {
  const resp = accessRequestSchema
    .find({
      ownerId: ownerId,
      status: enumStatus.pendingStatus,
    })
    .populate("requesterId")
    .populate("deviceId");

  return resp;
}

function allowAccessToDevice(requesterId, deviceId) {
  return accessRequestSchema
    .findOneAndUpdate(
      {
        requesterId: requesterId,
        deviceId: deviceId,
        status: enumStatus.pendingStatus,
      },
      { status: enumStatus.approvedStatus },
      { new: true }
    )
    .populate("deviceId")
    .populate("requesterId");
}

function deniedAccessToDevice(ownerId, requesterId, deviceId) {
  return accessRequestSchema.findOneAndUpdate(
    {
      ownerId: ownerId,
      requesterId: requesterId,
      deviceId: deviceId,
    },
    { status: enumStatus.deniedStatus },
    { new: true }
  );
}

function findRequestStatus(requesterId, deviceId) {
  return accessRequestSchema.find({
    requesterId,
    deviceId,
  });
}

module.exports = {
  findIsRequestExist,
  findByUsername,
  findDevicesByUserIds,
  findRequestStatus,
  requestExistsOrNot,
  getApprovedDevice,
  getDeniedDevice,
  removeDeniedRequest,
  createRequestToAccessDevice,
  getPendingRequests,
  allowAccessToDevice,
  deniedAccessToDevice,
};
