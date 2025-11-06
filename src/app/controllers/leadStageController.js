const services = require('../services/leadStageServices.js');
const { statusCode } = require('../../config/default.json');


exports.createLeadStageController = async ({ body }) => {
  try {
    return await services.createLeadStage(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.getAllLeadStagesController = async ({ query }) => {
  try {
    return await services.getAllLeadStages(query);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.getLeadStageByIdController = async ({ query , params }) => {
  try {
    return await services.getAllLeadByIdStages(query , params);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.updateLeadStageController = async ({ params , body }) => {

  try {
    return await services.updateLeadStage(params , body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.deleteLeadStageController = async ({ params }) => {
  try {
    return await services.deleteLeadStage(params);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

// lead status routes

exports.createLeadStatusController = async ({ body }) => {
  try {
    return await services.createLeadStatus(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.getAllLeadStatusesController = async ({ query }) => {
  try {
    return await services.getAllLeadStatuses(query);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.updateLeadStatusController = async ({ params , body }) => {

  try {
    return await services.updateLeadStatus(params , body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.deleteLeadStatusController = async ({ params }) => {
  try {
    return await services.deleteLeadStatus(params);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


// lead reason routes


exports.createLeadReasonController = async ({ body }) => {
  try {
    return await services.createReasonStatus(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.getAllLeadReasonsController = async ({ query }) => {
  try {
    return await services.getAllReasonStatuses(query);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.updateLeadReasonController = async ({ params , body }) => {

  try {
    return await services.updateReasonStatus(params , body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.deleteLeadReasonController = async ({ params }) => {
  try {
    return await services.deleteReasonStatus(params);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

// get full leads with stage, status, reason
exports.getfullLeadsController = async ({ query }) => {
  try {
    return await services.getfullLeads(query);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};
