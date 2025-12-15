const services = require('../services/leadServices.js');
const { statusCode } = require('../../config/default.json');

exports.createLead = async ({ body }) => {
  try {
    return await services.addLead(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.generateLead = async ({ query }) => {
  console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyy" , query);
  
  try {
    return await services.getAllLeads(query);
  } catch (error) {
    console.log("errorerror" , error);
    
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.changeLeadStatus = async ({ body , params }) => {
  
  try {
    return await services.changeStatus(body , params);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.bulkUploadLeads = async ({ body}) => {
  try {
    return await services.leadUpload(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.getStageStatusStructure = async ({ query }) => {
  console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyy" , query);
  
  try {
    return await services.getStageStatusStructure(query);
  } catch (error) {
    console.log("errorerror" , error);
    
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};