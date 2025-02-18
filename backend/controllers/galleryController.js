const { StatusCodes } = require("http-status-codes");
const messages = require("../utils/constants").default;
const galleryService = require("../services/galleryService");
const uploadImage = async (req, res) => {
  const { deviceId, imagePath, location, height, width, format } = req.body;
  const data = {
    deviceId,
    imagePath,
    location,
    height,
    width,
    format,
  };
  if (!deviceId || !imagePath || !height || !width || !format) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: messages.fieldCheck });
  }
  const response = await galleryService.uploadImage(data);
  if (response) {
    return res
      .status(StatusCodes.CREATED)
      .send({ message: messages.image.createSuccess, response });
  } else {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send({ message: messages.image.createError });
  }
};
module.exports = {
  uploadImage,
};
