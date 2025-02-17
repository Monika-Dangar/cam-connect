const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema(
  {
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      required: true,
    },
  }
);
const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
