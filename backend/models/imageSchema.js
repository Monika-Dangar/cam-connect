const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
  {
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
    },
    imagePath: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: { type: Number, required: true },
    format: {
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
const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
