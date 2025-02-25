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
const getAllImage = async (username, deviceIds, tag, startDate, endDate) => {
  const user = await findByUsername(username);
  let ids = [];
  if (tag) {
    ids = await tagRepo.findImageIdsOfTag(tag);
  }

  const imageData = await Promise.all([
    accessRequestRepo.findDeviceIdsOfSharedWithMe(
      user._id,
      deviceIds,
      ids[0]?.imageIds || [],
      startDate,
      endDate
    ),
    deviceRepo.findImagesOfLoggedInUserDevice(
      user._id,
      deviceIds,
      ids[0]?.imageIds || [],
      startDate,
      endDate
    ),
  ]);

  const data = [...imageData[0], ...imageData[1]];
  console.log(data.length);
  if (data.length != 0) {
    return data.sort((a, b) => b.createdAt - a.createdAt);
  } else {
    return null;
  }
};

module.exports = {
  uploadImage,
  getDeviceImage,
  getAllImage,
};
