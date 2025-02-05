const mongoose = require("mongoose");
const imei = require("node-imei");
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
    imeiNumber: {
      type: String,
      unique: true,
      default: () => imei.getRandom(),
    },
  },
  { timestamps: true }
);
const Device = mongoose.model("Device", cameraSchema);
module.exports = Device;
