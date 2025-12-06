// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/postgres.config");
// const Leads = require('./lead'); // Fixed: import Leads model
// const WorkflowRule = require('./workflowRulesModel'); // Use PascalCase for consistency

// // models/WorkFlowQueue.js

// const WorkFlowQueue = sequelize.define("WorkFlowQueue", {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     lead_id: { type: DataTypes.INTEGER, allowNull: false }, // Add allowNull for clarity
//     workflow_ruleID: { type: DataTypes.INTEGER, allowNull: false },
//     executed_At: { type: DataTypes.DATE, allowNull: true },
//     Status: { 
//         type: DataTypes.ENUM("pending", "processing", "executed", "failed"),
//         defaultValue: "pending",
//         allowNull: false,
//     },
//     created_at: { // Fixed: changed 'create_at' to 'created_at' to follow common convention
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//     },
// }, {
//     tableName: "WorkFlow_queue",
//     timestamps: false, // If you don't have 'createdAt' and 'updatedAt' columns
// });

// // Associations
// WorkFlowQueue.belongsTo(Leads, { foreignKey: "lead_id" });
// WorkflowRule.hasMany(WorkFlowQueue, { foreignKey: "workflow_ruleID" }); // hasMany is typically more appropriate
// WorkFlowQueue.belongsTo(WorkflowRule, { foreignKey: "workflow_ruleID" });

// module.exports = WorkFlowQueue;
