const Image = require("../models/imageSchema");
const createImage = (data) => {
  const image = new Image(data);
  return image.save();
};
const getImageByDeviceId = (deviceId) => {
  return Image.find({ deviceId }).populate("deviceId").lean();
};

module.exports = {
  createImage,
  getImageByDeviceId,
};
