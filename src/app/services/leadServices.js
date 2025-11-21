const { statusCode, resMessage } = require("../../config/default.json");
const Lead = require("../../pgModels/lead");
const { Op } = require("sequelize");
const LeadStage = require("../../pgModels/LeadStages/LeadStage");
const LeadStatus = require("../../pgModels/LeadStages/leadStatus");
const XLSX = require('xlsx');
const path = require("path");
const fs = require('fs');

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
    // const leads = await Lead.findAll({
    //   attributes: {
    //     exclude: ["assignedTo", "stage_id" , "reason_id" , "created_by"]
    //   },
    //   include: [
    //     { model: LeadStatus, as: "status", attributes: ["name", "color"] }
    //   ],
    //   order: [["createdAt", "DESC"]],
    // });
 const {
      searchField,   // e.g. "name", "email", "city"
      searchText,    // e.g. "sunil"
      statusIds,     // e.g. "1,2,3"
      assignees,     // e.g. "Anshul,Rohit"
      dateRange,     // today | yesterday | this_week | last_week | this_month | last_month | custom
      startDate,     // for custom
      endDate        // for custom
    } = query;

    let whereClause = {};

    // -----------------------------------------
    // 1️⃣ SEARCH FILTER (Dynamic JSONB Fields)
    // -----------------------------------------
    if (searchField && searchText) {
      whereClause = {
        ...whereClause,
        data: {
          [Op.contains]: {
            [searchField]: searchText
          }
        }
      };
    }

    // -----------------------------------------
    // 2️⃣ MULTIPLE STATUS FILTER
    // -----------------------------------------
    if (statusIds) {
      const statusArray = statusIds.split(",").map(Number);
      whereClause.status_id = { [Op.in]: statusArray };
    }

    // -----------------------------------------
    // 3️⃣ MULTIPLE ASSIGNEE FILTER
    // -----------------------------------------
    if (assignees) {
      const assigneeArray = assignees.split(",");
      whereClause.assignedTo = { [Op.in]: assigneeArray };
    }

    // -----------------------------------------
    // 4️⃣ DATE FILTERS
    // -----------------------------------------
    const now = new Date();
    let start, end;

    switch (dateRange) {
      case "today":
        start = new Date(now.setHours(0, 0, 0, 0));
        end = new Date();
        break;

      case "yesterday":
        start = new Date(now.setDate(now.getDate() - 1));
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setHours(23, 59, 59, 999);
        break;

      case "this_week":
        start = new Date(now.setDate(now.getDate() - now.getDay()));
        start.setHours(0, 0, 0, 0);
        end = new Date();
        break;

      case "last_week":
        start = new Date(now.setDate(now.getDate() - now.getDay() - 7));
        start.setHours(0, 0, 0, 0);
        end = new Date(now.setDate(start.getDate() + 6));
        end.setHours(23, 59, 59, 999);
        break;

      case "this_month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date();
        break;

      case "last_month":
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;

      case "custom":
        if (startDate && endDate) {
          start = new Date(startDate);
          end = new Date(endDate);
        }
        break;
    }

    if (start && end) {
      whereClause.createdAt = { [Op.between]: [start, end] };
    }
  

    // -----------------------------------------
    // 📌 FETCH LEADS
    // -----------------------------------------
    const leads = await Lead.findAll({
      where: whereClause,
      attributes: {
        exclude: ["assignedTo", "stage_id", "reason_id", "created_by"]
      },
      include: [
        { model: LeadStatus, as: "status", attributes: ["name", "color"] }
      ],
      order: [["createdAt", "DESC"]],
    });

    console.log("leadsleadsleads" , leads);
    

    return {
      statusCode: statusCode.OK,
      success: true,
      message: `${leads.length == 0 ? resMessage.NO_DATA_FOUND : resMessage.GET_LEAD_FIELD_Data }`,
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

exports.changeStatus = async (body, params) => {
  try {
    const { leadId } = params;
    const { statusId } = body;

    if (!leadId || !statusId) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "lead_id and status_id are required",
      };
    }

    const leadData = await Lead.findByPk(leadId);

    if (!leadData) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Lead not found",
      };
    }

    const status = await LeadStatus.findByPk(statusId, {
      include: [{ model: LeadStage, as: "stage" }],
    });

    if (!status) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Invalid status_id",
      };
    }

    await leadData.update({
      status_id: status.id,
      stage_id: status.stage_id,
    });

    const updatedLead = await Lead.findByPk(leadId, {
      include: [{ model: LeadStatus, as: "status" }],
    });

    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.LEAD_STATUS_UPDATED || "Lead status updated successfully",
      data: updatedLead,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

/**
 * Bulk upload leads from Excel file data.
 *
 * Expects body to have:
 * - filePath: path to uploaded Excel file
 *
 * Returns standard response.
 */
exports.leadUpload = async (body) => {
  try {
    // Extract file path from expected keys
    const relativePath = body.filePath || body.file || body.path;
    if (!relativePath || typeof relativePath !== "string") {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "File path is required",
      };
    }

    // Build the absolute path to the uploaded file
    const filePath = path.join(__dirname, "../../../public/uploads", relativePath);

    // Check if the file exists at the specified path
    if (!fs.existsSync(filePath)) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Uploaded file not found on server",
      };
    }

    // Read the Excel file (.xlsx) using xlsx module
    const workbook = XLSX.readFile(filePath);

    // Get the first worksheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert worksheet data to JSON array
    let leadsData = XLSX.utils.sheet_to_json(worksheet);

    if (!Array.isArray(leadsData) || leadsData.length === 0) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "No leads found in uploaded Excel file",
      };
    }

    // Fetch default status for newly uploaded leads
    const defaultStatus = await LeadStatus.findOne({ where: { is_default: true } });

    // Normalize keys: camelCase, trim
    const normalizeKey = (key) => {
      return key
        .replace(/^\s+|\s+$/g, '') // Trim spaces
        .toLowerCase().trim().replace(/\s+/g, "_")
        .replace(/^\w/, c => c.toLowerCase()); // Lowercase first char
    };

    // Apply normalization for each lead object
    leadsData = leadsData.map(obj => {
      const normalized = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const normKey = normalizeKey(key);
          normalized[normKey] = obj[key];
        }
      }
      return normalized;
    });

    // Bulk create leads
    const createdLeads = [];
    console.log("leadsDataleadsData" , leadsData);
    
    for (const leadObj of leadsData) {
      const lead = await Lead.create({
        data: leadObj !== undefined ? leadObj : null,
        source: "excel" !== undefined ? "excel" : null,
        status_id: defaultStatus ? defaultStatus.id : null,
      });
      createdLeads.push(lead);
    }

    // const cLeads = await Lead.bulkCreate(createdLeads, { returning: true });

    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.LEAD_CREATED || "Lead(s) uploaded successfully",
      data: createdLeads,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};



exports.getStageStatusStructure = async () => {
  try {
    // Fetch all stages and their statuses
    const stages = await LeadStage.findAll({
      where: { is_active: true },
      include: [
        {
          model: LeadStatus,
          as: "statuses",
          where: { is_active: true },
          required: false, // even if no statuses exist
          attributes: ["id", "name", "color"],
        },
      ],
      order: [["order", "ASC"]],
    });

    // Format data
    const formatted = stages.map((stage) => ({
      title: stage.name,
      items: (stage.statuses || []).map((status) => ({
        id: status.id,
        label: status.name,
        color: status.color || "bg-gray-400", // fallback if color missing
      })),
    }));

    return {
      statusCode: 200,
      success: true,
      message: "Lead stages with statuses fetched successfully",
      data: formatted,
    };
  } catch (error) {
    console.error("❌ Error in getStageStatusStructure:", error);
    return {
      statusCode: 500,
      success: false,
      message: error.message,
    };
  }
};