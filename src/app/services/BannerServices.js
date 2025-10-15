const { statusCode, resMessage } = require("../../config/default.json");
// const HomePageDetailsModel = require("../../models/HomePageDetailsModel");
const bannerModel = require("../../models/BannerModel");

/**
 * Add or update dynamic home page services according to schema.
 *
 * @param {object} body - The home page details to add or update.
 * @returns {object} - An object containing the status code, success flag, message, and home page data.
 * @throws Will throw an error if there is a database error.
 */
exports.addBanner = async (body) => {
  try {
    // Create a new banner according to the BannerModel schema
    const newBanner = await bannerModel.create(body);

    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.Add_Banner_Data || "Banner added successfully",
      data: newBanner,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};
