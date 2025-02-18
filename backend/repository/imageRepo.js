const Image = require("../models/imageSchema");
const createImage = (data) => {
  const image = new Image(data);
  return image.save();
};
module.exports = {
  createImage,
};
