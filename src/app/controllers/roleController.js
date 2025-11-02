const services = require('../services/roleService.js');
const { statusCode } = require('../../config/default.json');



/**
 * Function to handle addDoctorAvailability.
 *
 * @param {Object} param - The function parameter object.
 * @param {Object} param.body - The request body containing set time detials.
 * @returns {Object} - The response object containing status code, success flag, and message.
 * @throws Will throw an error if login fails.
 */
exports.getRoles = async () => {
  try {
    return await services.getRoles();
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};
