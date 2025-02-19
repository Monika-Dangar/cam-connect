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
const removeTag = async (req, res) => {
  const { tagId } = req.body;
  const response = await tagService.removeTag(tagId);
  if (response) {
    res.status(StatusCodes.OK).send({ message: messages.tag.deleteSuccess });
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: messages.tag.deleteFailure });
  }
};
const getTagOfParticularImage = async (req, res) => {
  const { imageId } = req.body;
  const response = await tagService.getTag(imageId);
  if (response) {
    return res
      .status(StatusCodes.OK)
      .send({ message: messages.tag.tagGet, response });
  } else {
    return res
      .status(StatusCodes.OK)
      .send({ message: messages.tag.tagNotThere });
  }
};
const getMaxUsedTags = async (req, res) => {
  const response = await tagService.getMaxUsedTags();
  if (response) {
    return res
      .status(StatusCodes.OK)
      .send({ message: messages.tag.tagGet, response });
  } else {
    return res
      .status(StatusCodes.OK)
      .send({ message: messages.tag.allTagNotThere });
  }
};
module.exports = {
  addTag,
  removeTag,
  getTagOfParticularImage,
  getMaxUsedTags,
};
