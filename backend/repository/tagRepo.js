const Tag = require("../models/tagSchema");
const addTag = (data) => {
  const tagData = new Tag(data);
  return tagData.save();
};
const findTag = (tag, imageId) => {
  return Tag.find({ tag: { $regex: tag, $options: "i" }, imageId });
};
module.exports = {
  addTag,
  findTag,
};
