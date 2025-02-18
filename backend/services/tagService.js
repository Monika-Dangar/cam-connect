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
const removeTag = async () => {};
const getTag = async () => {};
module.exports = {
  addTag,
  removeTag,
  getTag,
};
