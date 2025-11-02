const { statusCode, resMessage } = require("../../config/default.json");
const permissionTemplateModel = require("../../pgModels/permissionTemplateModel");


exports.getPermssionTemplates = async () => {
  try {
    
    const roles = await permissionTemplateModel.findAll();

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Permission Template",
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