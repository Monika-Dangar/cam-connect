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
const findImagesOfLoggedInUserDevice = (userId) => {
  return device.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $lookup: {
        from: "images",
        localField: "_id",
        foreignField: "deviceId",
        as: "image",
      },
    },
    {
      $project: {
        _id: 0,
        deviceDetails: {
          _id: "$_id",
          userId: "$userId",
          deviceName: "$deviceName",
          deviceLocation: "$deviceLocation",
          deviceType: "$deviceType",
          imeiNumber: "$imeiNumber",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
        },
        image: 1,
      },
    },
  ]);
};
module.exports = {
  createUserDevice,
  findDeviceByUserId,
  updateDevice,
  deleteDeviceById,
  findImagesOfLoggedInUserDevice,
};
