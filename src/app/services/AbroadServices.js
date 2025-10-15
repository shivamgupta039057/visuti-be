const { statusCode, resMessage } = require("../../config/default.json");
const abroadModel = require("../../models/MbbsAbroadModel");

/**
 * Add or update dynamic home page services according to schema.
 *
 * @param {object} body - The home page details to add or update.
 * @returns {object} - An object containing the status code, success flag, message, and home page data.
 * @throws Will throw an error if there is a database error.
 */
exports.addAbroad = async (body) => {
  try {
    // Create a new banner according to the BannerModel schema
    const newBanner = await abroadModel.create(body);

    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.Add_Neet_Feature || "Neet Feature added successfully",
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