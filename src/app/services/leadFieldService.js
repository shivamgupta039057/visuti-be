const { statusCode, resMessage } = require("../../config/default.json");
// const Lead = require("../../pgModels/lead");
const leadfield = require("../../pgModels/leadField");
const LeadStatus = require("../../pgModels/LeadStages/leadStatus");
const WorkflowRules = require("../../pgModels/workflowRulesModel"); // Make sure to require the WorkflowRules model if not already at the top
const WorkFlowQueue = require("../../pgModels/workflowQueueModel");
/**
 * Add or update dynamic home page services according to schema.
 *
 * @param {object} body - The home page details to add or update.
 * @returns {object} - An object containing the status code, success flag, message, and home page data.
 * @throws Will throw an error if there is a database error.
 */
exports.createLeadField = async (body) => {
  console.log("fdsfkljsdfdklfdjs", body);

  try {
    const { lable, ...rest } = body;

    const existingField = await leadfield.findOne({
      where: {
        lable: lable,
      },
    });

    if (existingField) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: resMessage.FIELD_LABLE_EXIST,
      };
    }

    const name = lable.toLowerCase().trim().replace(/\s+/g, "_");
    
    
     const maxOrderStatus = await leadfield.findOne({
     order: [["order", "DESC"]],
     attributes: ["order"],
    });
    console.log("maxOrderStatusmaxOrderStatus" , maxOrderStatus);
    const nextOrder = maxOrderStatus ? maxOrderStatus.order + 1 : 1;

   

    const leadfiled = await leadfield.create({ ...rest, lable, name , order: nextOrder });
    
    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.Add_LEAD_FIELD_Data,
      data: leadfiled,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.getAllLeadFields = async (query) => {
  const { page = 1, limit = 10} = query;
  try {
    const getfield = await leadfield.findAll({ order: [["order", "ASC"]] });
    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.GET_LEAD_FIELD_Data,
      data: getfield,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.updateLeadFieldServices = async (params , body) => {
  const { id } = params;
  try {
    const updatefield = await leadfield.update(
      { ...body },
      {
        where: { id: id },
      }
    );

     if (body.status_id) {
      const statusId = body.status_id;

      // Validate the status
      const status = await LeadStatus.findByPk(statusId);
      if (!status) {
        return {
          statusCode: statusCode.NOT_FOUND,
          success: false,
          message: "Invalid status_id",
        };
      }

      // Check workflow rules
      const workflowRule = await WorkflowRules.findOne({
        where: { Status_id: statusId },
      });

      if (workflowRule && workflowRule.action_data) {
        console.log(
          "Workflow Template for this status:",
          workflowRule.action_data
        );

        // Find the related lead_id from leadfield
        const leadFieldRecord = await leadfield.findByPk(id);
        const lead_id = leadFieldRecord.id; // assuming leadfield table has lead_id

        // Check for existing queue entry
        let queueEntry = await WorkFlowQueue.findOne({
          where: {
            workflow_ruleID: workflowRule.id,
          },
        });

        if (queueEntry) {
          await queueEntry.update({
            Status: "executed",
            executed_At: null,
          });
        } else {
          await WorkFlowQueue.create({
            lead_id: lead_id,
            workflow_ruleID: workflowRule.id,
            Status: "processing",
          });
        }
      }
    }


    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.UPDATE_LEAD_FIELD_Data,
      data: updatefield,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.deleteLeadField = async (params) => {
  const { id } = params;
  try {
    const updatefield = await leadfield.destroy(
      {
        where: { id: id },
      }
    );
    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.DELETE_LEAD_FIELD_Data,
      data: updatefield,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.reorderLeadField = async (query) => {
  const { page = 1, limit = 10} = query;
  try {
    const leadsName = await leadfield.findAll({ 
      attributes: ['lable'], 
      order: [["order", "ASC"]] 
    });
    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.GET_RECODE_LIST_DATA,
      data: leadsName,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};