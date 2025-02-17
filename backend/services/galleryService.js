const imageRepo = require("../repository/imageRepo");
const uploadImage = async (data) => {
  const response = await imageRepo.createImage(data);
  if (response) {
    return response;
  }
};
module.exports = {
  uploadImage,
};
