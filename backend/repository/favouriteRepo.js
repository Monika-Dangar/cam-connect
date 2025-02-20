const Favourite = require("../models/favouriteSchema");
const findImageExists = (imageId) => {
  return Favourite.find({ imageId });
};
const addToFavourite = (data) => {
  const favData = new Favourite(data);
  return favData.save();
};
const removeFromFavourite = (imageId) => {
  return Favourite.deleteOne({ imageId });
};
const getFavourite = (userId) => {
  return Favourite.find({ userId })
    .populate("imageId")
    .populate("deviceId")
    .sort({ createdAt: -1 })
    .lean();
};
module.exports = {
  addToFavourite,
  removeFromFavourite,
  findImageExists,
  getFavourite,
};
