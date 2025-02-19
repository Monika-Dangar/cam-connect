const imageRepo = require("../repository/imageRepo");
const deviceRepo = require("../repository/deviceRepo");
const accessRequestRepo = require("../repository/accessRequestRepo");
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
    const res = response;
    const formattedResponse = res.reduce((acc, curr) => {
      if (curr && !acc[curr._id]) {
        console.log(curr);
        const formattedCurr = {
          ...curr,
          createdAt: curr.createdAt.toUTCString(),
          updatedAt: curr.updatedAt.toUTCString(),
        };
        acc[curr._id] = formattedCurr;
      }
      return acc;
    }, {});
    return Object.values(formattedResponse).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else {
    return null;
  }
};
const getAllImage = async (username) => {
  const user = await findByUsername(username);
  const deviceIds = await Promise.all([
    accessRequestRepo.findDeviceIdsOfSharedWithMe(user._id),
    deviceRepo.findImagesOfLoggedInUserDevice(user._id),
  ]);
  const data = [...deviceIds[0], ...deviceIds[1]];

  const allImages = data.reduce((acc, curr) => {
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
  }, {});
  return Object.values(allImages).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

// console.log(deviceIds);
// if (response.length != 0) {
//   return response;
// } else {
//   return null;
// }

module.exports = {
  uploadImage,
  getDeviceImage,
  getAllImage,
};
