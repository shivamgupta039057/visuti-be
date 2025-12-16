const services = require('../services/whatsAppService');
const { statusCode } = require('../../config/default.json');


/* ----------------------------------------
   1. VERIFY WEBHOOK  (GET)
-----------------------------------------*/
exports.verifyWebhook = async ({ query }) => {
  try {
    return await services.verifyWebhook(query);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

/* ----------------------------------------
   2. HANDLE INCOMING WEBHOOK (POST)
-----------------------------------------*/
exports.receiveWebhook = async ({ body }) => {
  try {
    return await services.receiveWebhook(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

/* ----------------------------------------
   3. SEND OUTBOUND MESSAGE
-----------------------------------------*/
exports.sendMessage = async ({ body }) => {
  try {
    return await services.sendMessage(body);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

/* ----------------------------------------
   4. GET LEAD LIST (CHAT SIDEBAR)
-----------------------------------------*/
exports.getLeads = async () => {
  try {
    return await services.getLeads();
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

/* ----------------------------------------
   5. GET CHAT HISTORY FOR A LEAD
-----------------------------------------*/
exports.getChatByLead = async ({ params }) => {
  try {
    return await services.getChatByLead(params.lead_id);
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


