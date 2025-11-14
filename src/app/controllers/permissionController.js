const services = require('../services/permissionService');
const { statusCode } = require('../../config/default.json');

/**
 * Function to handle addDoctorAvailability.
 *
 * @param {Object} param - The function parameter object.
 * @param {Object} param.body - The request body containing set time detials.
 * @returns {Object} - The response object containing status code, success flag, and message.
 * @throws Will throw an error if login fails.
 */
exports.getPermssionTemplate = async () => {
  try {
    return await services.getPermssionTemplates();
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


/**
 * Function to handle addDoctorAvailability.
 *
 * @param {Object} param - The function parameter object.
 * @param {Object} param.body - The request body containing set time detials.
 * @returns {Object} - The response object containing status code, success flag, and message.
 * @throws Will throw an error if login fails.
 */
exports.createPermissionTemplate = async ({body}) => {
  try {
    return await services.createPermissionTemplate(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.updatePermissionTemplate = async ({param,body}) => {
  try {
    return await services.updatePermissionTemplate(param,body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};
