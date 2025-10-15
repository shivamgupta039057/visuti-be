const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    subtitle: {
      type: String,
      trim: true,
      index: true,
    },
    buttonText: {
      type: String,
      trim: true,
      index: true,
    },
    buttonLink: {
      type: String,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BannerSchema.index({
  title: 1,
  subtitle: 1,
  buttonText: 1,
  buttonLink: 1,
  image: 1,
});

const Banner = mongoose.model("Banner", BannerSchema);
module.exports = Banner;
