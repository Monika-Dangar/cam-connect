const accessRequest = require("../models/accessRequestSchema");
const { ObjectId } = require("mongodb"); // Import ObjectId

function findDeviceSharedWithMe(requesterId) {
  return accessRequest
    .find({ requesterId, status: "approved", isActive: true })
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
// function findDeviceIdsOfSharedWithMe(
//   requesterId,
//   deviceIds,
//   imageIds,
//   startDate,
//   endDate
// ) {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   return accessRequest.aggregate([
//     {
//       $match: {
//         requesterId,
//         status: "approved",
//         isActive: true,
//         ...(deviceIds?.length > 0 ? { deviceId: { $in: deviceIds } } : {}),
//       },
//     },
//     {
//       $lookup: {
//         from: "devices",
//         localField: "deviceId",
//         foreignField: "_id",
//         as: "deviceDetails",
//       },
//     },
//     {
//       $unwind: "$deviceDetails",
//     },
//     {
//       $lookup: {
//         from: "images",
//         localField: "deviceDetails._id",
//         foreignField: "deviceId",
//         as: "image",
//       },
//     },

//     {
//       $unwind: "$image",
//     },
//     {
//       $match: imageIds?.length > 0 ? { "image._id": { $in: imageIds } } : {},
//     },
//     {
//       $match:
//         startDate && endDate
//           ? { "image.createdAt": { $gte: start, $lte: end } }
//           : {},
//     },
//     {
//       $project: {
//         _id: 0,
//         _id: "$image._id",
//         deviceId: "$deviceDetails",
//         imagePath: "$image.imagePath",
//         height: "$image.height",
//         width: "$image.width",
//         format: "$image.format",
//         createdAt: "$image.createdAt",
//         updatedAt: "$image.updatedAt",
//       },
//     },
//   ]);
// }
const findDeviceIdsOfSharedWithMe = (requesterId) => {
  return accessRequest.aggregate([
    {
      $match: {
        requesterId,
        status: "approved",
        isActive: true,
      },
    },
    {
      $project: {
        _id: 0,
        _id: "$deviceId",
      },
    },
  ]);
};
module.exports = {
  findDeviceSharedWithMe,
  findDeviceSharedWithOthers,
  deleteSharedDevice,
  deleteLinkedDevice,
  findDeviceIdsOfSharedWithMe,
};
