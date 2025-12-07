const { statusCode, resMessage } = require("../../config/default.json");
const WorkflowRules = require("../../pgModels/workflowRulesModel");

/**
 * Create a new workflow rule.
 *
 * @param {object} body - The workflow rule details { Status_id, ActionType, action_data, Delay, isActive }
 * @returns {object} - An object containing the status code, success flag, message, and created workflow rule data.
 * @throws Will throw an error if there is a database error.
 */
exports.createWorkFlow = async (body) => {
  try {
    console.log("dfkdjhfkdjklsdjdklsfjdksljdfldjkl" , body);
    
    const { Status_id, ActionType, action_data, Delay, isActive } = body;

    // Check for required fields
    if (!Status_id || !ActionType || !action_data) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Status_id, ActionType, and action_data are required.",
      };
    }
    
    // Optionally, check if a rule with exactly same key already exists
    const exists = await WorkflowRules.findOne({
      where: { Status_id, ActionType },
    });
    if (exists) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Workflow rule with this Status and ActionType already exists.",
      };
    }

    const createdRule = await WorkflowRules.create({
      Status_id,
      ActionType,
      action_data,
      Delay: Delay || null,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Workflow rule created successfully.",
      data: createdRule,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};
