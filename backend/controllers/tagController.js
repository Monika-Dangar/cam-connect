const { StatusCodes } = require("http-status-codes");
const messages = require("../utils/constants").default;
const tagService = require("../services/tagService");
const addTag = async (req, res) => {
  const { imageId, tag } = req.body;
  if (!imageId || !tag) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .send({ message: messages.fieldCheck });
  }
  const response = await tagService.addTag({ imageId, tag });
  if (response) {
    return res
      .status(StatusCodes.CREATED)
      .send({ message: messages.tag.createSuccess, response });
  } else {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send({ message: messages.tag.createError });
  }
};
const removeTag = async () => {};
const getTag = async () => {};
module.exports = {
  addTag,
  removeTag,
  getTag,
};
