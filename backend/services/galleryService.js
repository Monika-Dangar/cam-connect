const imageRepo = require("../repository/imageRepo");
const { findByUsername } = require("../repository/userRepo");

const uploadImage = async (data) => {
  const response = await imageRepo.createImage(data);
  if (response) {
    return response;
  }
};
const getDeviceImage = async (deviceId) => {
  const response = await imageRepo.getImageByDeviceId(deviceId);
  if (response.length != 0) {
    return response;
  } else {
    return null;
  }
};
const getAllImageOfAutenticatedUser = async (username) => {
  const user = await findByUsername(username);
  console.log(user);
  const response = await imageRepo.getAllImageOfAutenticatedUser(user._id);
  if (response.length != 0) {
    return response;
  } else {
    return null;
  }
};
module.exports = {
  uploadImage,
  getDeviceImage,
  getAllImageOfAutenticatedUser,
};
