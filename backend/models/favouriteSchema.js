const mongoose = require("mongoose");
const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  {
    timestamps: {
      required: true,
    },
  }
);
const Favourite = mongoose.model("Favourite", favouriteSchema);
module.exports = Favourite;
