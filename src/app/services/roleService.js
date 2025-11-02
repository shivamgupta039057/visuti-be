const { statusCode, resMessage } = require("../../config/default.json");
const Role = require("../../pgModels/roleModel");


exports.getRoles = async () => {
  try {
    
    
    const roles = await Role.findAll();

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "All Roles",
      data: roles,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};