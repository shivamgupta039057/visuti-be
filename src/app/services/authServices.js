const {statusCode , resMessage} = require('../../config/default.json');
const HomePageDetailsModel = require('../../models/HomePageDetailsModel');

exports.regiester = async (body) => {
  try {
    console.log("body in services",body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

