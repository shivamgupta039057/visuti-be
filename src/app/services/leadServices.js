const { statusCode, resMessage } = require("../../config/default.json");
const Lead = require("../../pgModels/lead");
const LeadStatus = require("../../pgModels/LeadStages/leadStatus");

/**
 * Add or update dynamic home page services according to schema.
 *
 * @param {object} body - The home page details to add or update.
 * @returns {object} - An object containing the status code, success flag, message, and home page data.
 * @throws Will throw an error if there is a database error.
 */
exports.addLead = async (body) => {
  console.log("sdssadsasdsbodybodybodybody" , body);
  
  try {
    const { data, source, assignedTo, notes } = body;
    
   const status = await LeadStatus.findOne({ where: { is_default: true } });

   console.log("statusstatusstatusstatus" , status);
   

   const lead = await Lead.create({
     data,
     source,
     status_id: status ? status.id : null,
     notes,
   }); 


    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.LEAD_CREATED || "Lead Created successfull",
      data: {
        lead,
        status,
      },
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.getAllLeads = async (query) => {
  console.log("sdssadsasdsbodybodybodybody" , query);
  
  try {
    const leads = await Lead.findAll({
      attributes: {
        exclude: ["assignedTo", "stage_id" , "reason_id" , "created_by"]
      },
      include: [
        { model: LeadStatus, as: "status", attributes: ["name"] }
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.LEAD_CREATED || "Lead Created successfull",
      data: leads,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

