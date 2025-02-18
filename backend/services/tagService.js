const tagRepo = require("../repository/tagRepo");
const addTag = async (data) => {
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
