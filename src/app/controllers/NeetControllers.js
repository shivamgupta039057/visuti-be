const services = require('../services/NeetServices');
const { statusCode } = require('../../config/default.json');



/**
 * Function to handle addDoctorAvailability.
 *
 * @param {Object} param - The function parameter object.
 * @param {Object} param.body - The request body containing set time detials.
 * @returns {Object} - The response object containing status code, success flag, and message.
 * @throws Will throw an error if login fails.
 */
exports.addNeetFeaturePage = async ({ body }) => {
  try {
    console.log("bodybodybodybody",body);
    return await services.addFeature(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.addNeetProductPage = async ({ body }) => {
  try {
    console.log("bodybodybodybody",body);
    return await services.addProduct(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

