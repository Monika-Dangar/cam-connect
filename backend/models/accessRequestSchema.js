const mongoose = require("mongoose");
const accessRequestSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "pending", "denied"],
      required: true,
    },
  },
  { timestamps: true }
);
const accessRequest = mongoose.model("accessRequest", accessRequestSchema);
module.exports = accessRequest;
