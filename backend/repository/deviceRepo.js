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
const findImagesOfLoggedInUserDevice = (
  userId,
  deviceIds,
  imageIds,
  startDate,
  endDate
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return device.aggregate([
    {
      $match: {
        userId,
        ...(deviceIds?.length > 0 ? { _id: { $in: deviceIds } } : {}),
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
      $unwind: "$image",
    },
    {
      $match: imageIds?.length > 0 ? { "image._id": { $in: imageIds } } : {},
    },
    {
      $match:
        startDate && endDate
          ? { "image.createdAt": { $gte: start, $lte: end } }
          : {},
    },
    {
      $project: {
        _id: "$image._id",
        deviceId: {
          _id: "$_id",
          userId: "$userId",
          deviceName: "$deviceName",
          deviceLocation: "$deviceLocation",
          deviceType: "$deviceType",
          imeiNumber: "$imeiNumber",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
        },
        imagePath: "$image.imagePath",
        height: "$image.height",
        width: "$image.width",
        format: "$image.format",
        createdAt: "$image.createdAt",
        updatedAt: "$image.updatedAt",
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
