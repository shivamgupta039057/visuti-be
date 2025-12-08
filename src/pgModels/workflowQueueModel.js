const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");
const Lead = require('./lead');

const WorkFlowQueue = sequelize.define("WorkFlowQueue", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lead_id: { type: DataTypes.INTEGER, allowNull: false },
    workflow_ruleID: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key to WorkflowRules
    executed_At: { type: DataTypes.DATE, allowNull: true },
    Status: { 
        type: DataTypes.ENUM("pending", "processing", "executed", "failed"),
        defaultValue: "pending",
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "WorkFlow_queue",
    timestamps: false,
});

// Associations
// Note: WorkFlowQueue.belongsTo(WorkflowRules) is defined in workflowRulesModel.js to avoid circular dependency
WorkFlowQueue.belongsTo(Lead, { foreignKey: "lead_id", as: "lead" });

module.exports = WorkFlowQueue;
