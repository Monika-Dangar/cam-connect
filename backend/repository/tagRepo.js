const Tag = require("../models/tagSchema");
const addTag = (data) => {
  const tagData = new Tag(data);
  return tagData.save();
};
const findTag = (tag, imageId) => {
  return Tag.find({
    tag: { $regex: `^${tag.trim().replace(/\s+/g, " ")}$`, $options: "i" },
    imageId,
  });
};
const findImageIdsOfTag = (matchTag) => {
  return Tag.aggregate([
    {
      $match: {
        tag: {
          $regex: `^${matchTag}$`,
          $options: "i",
        },
      },
    },
    {
      $group: {
        _id: null,
        imageIds: { $push: "$imageId" },
      },
    },
  ]);
};
const removeTag = (_id) => {
  return Tag.deleteOne({ _id });
};
const getTagOfParticularImage = (imageId) => {
  return Tag.find({ imageId });
};

const getMaxUsedTags = () => {
  return Tag.aggregate([
    {
      $group: {
        _id: "$tag",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    { $limit: 50 },
    {
      $project: {
        tag: 1,
      },
    },
  ]);
};
module.exports = {
  addTag,
  findTag,
  removeTag,
  findImageIdsOfTag,
  getTagOfParticularImage,
  getMaxUsedTags,
};
