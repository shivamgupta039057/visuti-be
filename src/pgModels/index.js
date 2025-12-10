const sequelize = require('../config/postgres.config')
// require("./roleModel");
// require("./permissionModel");
// require("./permissionTemplateModel");
// require("./userModel");
// require("./permissionTemplatePermissionModel");
// require("./rolePermission");
require('./workflowRulesModel');

const LeadStage = require("./LeadStages/LeadStage");
const LeadStatus = require("./LeadStages/LeadStatus");
const WorkflowRules = require("./workflowRulesModel");
const WorkFlowQueue = require("./workflowQueueModel");


const RoleModel = require('./roleModel');
const PermissionTemplateModel = require('./permissionTemplateModel');
const UserModel = require('./userModel');




/* LeadStage → LeadStatus */
LeadStage.hasMany(LeadStatus, { foreignKey: "stage_id", as: "statuses" });
LeadStatus.belongsTo(LeadStage, { foreignKey: "stage_id", as: "stage" });

/* LeadStatus → WorkflowRules */
LeadStatus.hasMany(WorkflowRules, { foreignKey: "Status_id", as: "workflowRules" });
WorkflowRules.belongsTo(LeadStatus, { foreignKey: "Status_id", as: "status" });

/* WorkflowRules → WorkflowQueue */
WorkflowRules.hasMany(WorkFlowQueue, { foreignKey: "workflow_ruleID", as: "queueEntries" });
WorkFlowQueue.belongsTo(WorkflowRules, { foreignKey: "workflow_ruleID", as: "workflowRule" });


// Role <-> PermissionTemplate (1:1)
// RoleModel.belongsTo(PermissionTemplateModel, { foreignKey: 'permissionTemplateId', as: 'template' });
// PermissionTemplateModel.hasOne(RoleModel, { foreignKey: 'permissionTemplateId', as: 'role' });


const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Pg DataBase connected successfully');

        await sequelize.sync({ alter: true });
        console.log("Table synced successfully")
    } catch (err) {
        console.log("Database connection Failed", err)
    }
}

module.exports = { initDB, sequelize, RoleModel, PermissionTemplateModel, UserModel,  LeadStage,
  LeadStatus,
  WorkflowRules,
  WorkFlowQueue }