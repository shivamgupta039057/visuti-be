const services = require('../services/mediaServices.js');
const { statusCode } = require('../../config/default.json');





exports.uploadMedia = async ({ body }) => {
  try {
    console.log("bodybodybodybody",body);
    return await services.uploadMedia(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};
