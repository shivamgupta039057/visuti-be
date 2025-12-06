const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");
const workFlowRule=require('./workflowRulesModel')

// models/WorkFlowQueue.js

const WorkFlowQueue = sequelize.define("WorkFlowQueue", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lead_id: DataTypes.INTEGER,
    workflow_ruleID: DataTypes.INTEGER,
    executed_At: DataTypes.DATE,
    Status: DataTypes.ENUM("pending", "processing", "executed", "failed"),
    create_at: DataTypes.DATE
}, {
    tableName: "WorkFlow_queue",
});


WorkFlowQueue.belongsTo(Leads, { foreignKey: "lead_id" });


workFlowRule.hasOne(WorkFlowQueue,{foreignKey:"workflow_ruleID"})
WorkFlowQueue.belongsTo(workFlowRule, { foreignKey: "workflow_ruleID" });


module.exports = WorkFlowQueue
