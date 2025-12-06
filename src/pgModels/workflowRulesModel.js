const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");
const LeadSatus = require('./LeadStages/LeadStatus')
const WorkFlowQueue = require('./workflowQueueModel')
// models/WorkflowRules.js

const WorkflowRules = sequelize.define("WorkflowRules", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Status_id: DataTypes.INTEGER,
    ActionType: DataTypes.STRING,  // Example: "email", "sms" ,"Whatsapp"
    action_data: DataTypes.JSON,   // Template ID, etc.
    Delay: DataTypes.DATE,         // When to run after delay
    isActive: DataTypes.BOOLEAN
}, {
    tableName: "WorkflowRules",
});


WorkflowRules.belongsTo(LeadSatus, { foreignKey: "Status_id" ,as:"status"});
LeadSatus.hasOne(WorkflowRules, { foreignKey:"Status_id" ,as:"workflow"})


WorkflowRules.hasMany(WorkFlowQueue, { foreignKey: "workflow_ruleID" });

module.exports = WorkflowRules;

