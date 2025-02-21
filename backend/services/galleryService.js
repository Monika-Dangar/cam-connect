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

  if (response.length != 0) {
    return Object.values(
      response.reduce((acc, curr) => {
        if (curr && !acc[curr._id]) {
          const formattedCurr = {
            ...curr,
            createdAt: curr.createdAt.toUTCString(),
            updatedAt: curr.updatedAt.toUTCString(),
          };
          acc[curr._id] = formattedCurr;
        }
        return acc;
      }, {})
    );
  } else {
    return null;
  }
};
const getAllImage = async (
  username,
  deviceId,
  location,
  tag,
  startDate,
  endDate
) => {
  console.log(startDate, endDate);
  const user = await findByUsername(username);
  const deviceIds = await Promise.all([
    accessRequestRepo.findDeviceIdsOfSharedWithMe(user._id),
    deviceRepo.findImagesOfLoggedInUserDevice(user._id),
  ]);
  let data = [...deviceIds[0], ...deviceIds[1]];
  if (data.length != 0) {
    let allImages = Object.values(
      data.reduce((acc, curr) => {
        const { deviceDetails, image } = curr;

        for (const img of image) {
          if (!acc[img._id]) {
            img.deviceId = deviceDetails;
            img.createdAt = img.createdAt.toUTCString();
            img.updatedAt = img.updatedAt.toUTCString();
            acc[img._id] = img;
          }
        }

        return acc;
      }, {})
    );

    if (deviceId) {
      allImages = allImages.filter(
        (imageData) => imageData.deviceId._id.toString() === deviceId
      );
    } else {
      if (tag) {
        let imageIds = await tagRepo.findImageIdsOfTag(tag);
        if (imageIds[0]?.imageIds?.length > 0) {
          const extractedImageIds = imageIds[0].imageIds.map((id) =>
            id.toString()
          );
          allImages = allImages.filter((imageData) =>
            extractedImageIds.includes(imageData._id.toString())
          );
        }
      }
      if (location) {
        allImages = allImages.filter(
          (imageData) => imageData.deviceId.deviceLocation === location
        );
      }
      if (startDate && endDate) {
        allImages = allImages.filter(
          (imageData) =>
            new Date(imageData.createdAt).getTime() >=
              new Date(startDate).getTime() &&
            new Date(imageData.createdAt).getTime() <=
              new Date(endDate).getTime()
        );
      }
    }
    return Object.values(allImages).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } else {
    return null;
  }
};

module.exports = {
  uploadImage,
  getDeviceImage,
  getAllImage,
};
