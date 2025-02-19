const tagRepo = require("../repository/tagRepo");
const addTag = async (data) => {
  //check that tag already exists
  const tagExists = await tagRepo.findTag(data.tag, data.imageId);
  if (tagExists.length != 0) {
    return tagExists;
  }
  const response = await tagRepo.addTag(data);

  if (response) {
    return response;
  } else {
    return null;
  }
};
const removeTag = async (tagId) => {
  const response = await tagRepo.removeTag(tagId);
  if (response.deletedCount == 1) {
    return response.acknowledged;
  } else {
    return false;
  }
};
const getTag = async (imageId) => {
  const response = await tagRepo.getTagOfParticularImage(imageId);

  if (response.length != 0) {
    return response;
  } else {
    return null;
  }
};
const getMaxUsedTags = async () => {
  const response = await tagRepo.getMaxUsedTags();
  if (response.length != 0) {
    return response;
  } else {
    return null;
  }
};
module.exports = {
  addTag,
  removeTag,
  getTag,
  getMaxUsedTags,
};
