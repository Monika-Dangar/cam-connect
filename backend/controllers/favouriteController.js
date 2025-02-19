const { StatusCodes } = require("http-status-codes");
const messages = require("../utils/constants").default;
const favouriteService = require("../services/favouriteService");
const { findByUsername } = require("../repository/userRepo");
const handleFavourite = async (req, res) => {
  const { imageId, deviceId } = req.body;
  const user = await findByUsername(req.user);

  if (!imageId) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .send({ message: messages.fieldCheck });
  }
  const data = {
    userId: user._id,
    imageId,
    deviceId,
  };
  const response = await favouriteService.handleFavourite(data);
  if (response) {
    return res
      .status(StatusCodes.CREATED)
      .send({ message: response.message, response: response.response });
  } else {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send({ message: messages.favourite.error });
  }
};
const getFavourite = async (req, res) => {
  const user = await findByUsername(req.user);
  const response = await favouriteService.getFavourite(user._id);
  if (response) {
    return res.status(StatusCodes.OK).send(response);
  } else {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: messages.favourite.emptyFavourite });
  }
};
module.exports = {
  handleFavourite,
  getFavourite,
};
