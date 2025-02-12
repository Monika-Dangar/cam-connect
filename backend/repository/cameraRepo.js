const device = require('../models/cameraSchema');
const accessRequestSchema = require('../models/accessRequestSchema');
const User = require('../models/userSchema');

function findIsRequestExist(requesterId, ownerId, deviceId) {
  return accessRequestSchema.find({
    ownerId: ownerId,
    requesterId: requesterId,
    deviceId: deviceId,
  });
}

function findByUsername(usernameRegex) {
  return User.find({ username: usernameRegex });
}

function findDevicesByUserIds(userIds) {
  return device.find({ userId: { $in: userIds } });
}

function findRequestStatus(requesterId, deviceId) {
  return accessRequestSchema.find({
    requesterId: requesterId,
    deviceId: deviceId,
  });
}

function requestExistsOrNot(requesterId, deviceId) {
  return accessRequestSchema.find({
    requesterId: requesterId,
    deviceId: deviceId,
  });
}

function getApprovedDevice(userId) {
  return accessRequestSchema
    .find({
      ownerId: userId,
      status: 'approved',
    })
    .populate('deviceId')
    .populate('requesterId');
}

function getDeniedDevice(userId) {
  return accessRequestSchema
    .find({
      ownerId: userId,
      status: 'denied',
    })
    .populate('deviceId')
    .populate('requesterId');
}

function removeDeniedRequest(requestId) {
  return accessRequestSchema.findByIdAndDelete(requestId);
}

function createRequestToAccessDevice(data) {
  const resp = new accessRequestSchema(data);
  return resp.save();
}

function getPendingRequests(ownerId) {
  const resp = accessRequestSchema
    .find({
      ownerId: ownerId,
      status: 'pending',
    })
    .populate('requesterId')
    .populate('deviceId');

  return resp;
}

function allowAccessToDevice(ownerId, requesterId, deviceId) {
  return accessRequestSchema
    .findOneAndUpdate(
      {
        ownerId: ownerId,
        requesterId: requesterId,
        deviceId: deviceId,
        status: 'pending',
      },
      { status: 'approved' },
      { new: true },
    )
    .populate('deviceId')
    .populate('requesterId');
}

function deniedAccessToDevice(ownerId, requesterId, deviceId) {
  return accessRequestSchema.findOneAndUpdate(
    {
      ownerId: ownerId,
      requesterId: requesterId,
      deviceId: deviceId,
    },
    { status: 'denied' },
    { new: true },
  );
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
