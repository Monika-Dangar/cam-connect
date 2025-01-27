const mongoose = require("mongoose");
const cameraSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, //one user can create many device
      ref: "User",
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
    },
    deviceLocation: {
      type: String,
      required: true,
    },
    deviceType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Device = mongoose.model("Device", cameraSchema);
module.exports = Device;
