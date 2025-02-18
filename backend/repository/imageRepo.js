const Image = require("../models/imageSchema");
const createImage = (data) => {
  const image = new Image(data);
  return image.save();
};
const getImageByDeviceId = (deviceId) => {
  return Image.find({ deviceId });
};
const getAllImageOfAutenticatedUser = (userId) => {
  return Image.aggregate([
    {
      $lookup: {
        from: "devices",
        localField: "deviceId",
        foreignField: "_id",
        as: "device",
      },
    },

    {
      $unwind: "$device",
    },
    { $match: { "device.userId": userId } },
    {
      $project: {
        _id: 1,
        deviceId: 1,
        imagePath: 1,
        height: 1,
        width: 1,
        format: 1,
      },
    },
  ]);
};
module.exports = {
  createImage,
  getImageByDeviceId,
  getAllImageOfAutenticatedUser,
};
