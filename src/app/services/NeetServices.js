const { statusCode, resMessage } = require("../../config/default.json");
// const HomePageDetailsModel = require("../../models/HomePageDetailsModel");
const neetFeatureModel = require("../../models/NeetPredectorFeaturesModel");
const neetProductModel = require("../../models/NeetPredectorProductsModel");

/**
 * Add or update dynamic home page services according to schema.
 *
 * @param {object} body - The home page details to add or update.
 * @returns {object} - An object containing the status code, success flag, message, and home page data.
 * @throws Will throw an error if there is a database error.
 */
exports.addFeature = async (body) => {
  try {
    // Create a new banner according to the BannerModel schema
    const newBanner = await neetFeatureModel.create(body);

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


exports.addProduct = async (body) => {
  try {
    // Create a new banner according to the BannerModel schema
    const newBanner = await neetProductModel.create(body);

    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.Add_Neet_Product || "Neet Product added successfully",
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
