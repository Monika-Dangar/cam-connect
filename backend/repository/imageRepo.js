const Image = require("../models/imageSchema");
const createImage = (data) => {
  const image = new Image(data);
  return image.save();
};
const getImageByDeviceId = (deviceId) => {
  return Image.find({ deviceId })
    .populate("deviceId")
    .sort({ createdAt: -1 })
    .lean();
};
const findUserImages = (deviceIds, startDate, endDate, imageIds, cursor) => {
  return Image.aggregate([
    {
      $match: {
        deviceId: { $in: deviceIds },
        ...(imageIds?.length > 0 ? { _id: { $in: imageIds } } : {}),

        ...(startDate && endDate
          ? {
              createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
            }
          : {}),
        ...(cursor && { createdAt: { $lt: new Date(cursor) } }),
      },
    },
    {
      $lookup: {
        from: "devices",
        localField: "deviceId",
        foreignField: "_id",
        as: "deviceDetails",
      },
    },
    { $unwind: "$deviceDetails" },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 50,
    },
    {
      $project: {
        deviceId: {
          _id: "$deviceDetails._id",
          userId: "$deviceDetails.userId",
          deviceName: "$deviceDetails.deviceName",
          deviceLocation: "$deviceDetails.deviceLocation",
          deviceType: "$deviceDetails.deviceType",
          imeiNumber: "$deviceDetails.imeiNumber",
          createdAt: "$deviceDetails.createdAt",
          updatedAt: "$deviceDetails.updatedAt",
        },
        imagePath: 1,
        height: 1,
        width: 1,
        format: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);
};
module.exports = {
  createImage,
  findUserImages,
  getImageByDeviceId,
};
