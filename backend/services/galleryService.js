const imageRepo = require("../repository/imageRepo");
const deviceRepo = require("../repository/deviceRepo");
const tagRepo = require("../repository/tagRepo");
const accessRequestRepo = require("../repository/accessRequestRepo");
const { findByUsername } = require("../repository/userRepo");

const mongoose = require("mongoose");
const uploadImage = async (data) => {
  const response = await imageRepo.createImage(data);
  if (response) {
    return response;
  }
};
const getDeviceImage = async (deviceId) => {
  const response = await imageRepo.getImageByDeviceId(deviceId);
  console.log(response);
  if (response.length != 0) {
    return response;
  } else {
    return null;
  }
};
const getAllImage = async (
  username,
  deviceIds,
  tag,
  startDate,
  endDate,
  cursor
) => {
  const user = await findByUsername(username);
  let ids = [];
  if (tag.length > 0) {
    ids = await tagRepo.findImageIdsOfTag(tag);
  }
  deviceIds = deviceIds.map((id) => new mongoose.Types.ObjectId(id));
  if (deviceIds.length === 0) {
    const userDevice = await Promise.all([
      accessRequestRepo.findDeviceIdsOfSharedWithMe(user._id),
      deviceRepo.findDeviceIdsOfLoggedInUser(user._id),
    ]);
    deviceIds = [...userDevice[0], ...userDevice[1]].map((data) => data._id);
  }

  if (deviceIds.length > 0) {
    const imageData = await imageRepo.findUserImages(
      deviceIds,
      startDate,
      endDate,
      ids[0]?.imageIds,
      cursor
    );
    const nextCursor = imageData[imageData.length - 1]?.createdAt;
    return {
      imageData,
      nextCursor,
    };
  }

  return null;
  // const data = [...imageData[0], ...imageData[1]];
  // if (data.length != 0) {
  //   return data.sort((a, b) => b.createdAt - a.createdAt);
  // } else {
  //   return null;
  // }
};

module.exports = {
  uploadImage,
  getDeviceImage,
  getAllImage,
};
