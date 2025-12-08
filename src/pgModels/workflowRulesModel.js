const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");
const LeadStatus = require('./LeadStages/leadStatus'); // Import LeadStatus model
const WorkFlowQueue = require('./workflowQueueModel');

// models/WorkflowRules.js

const WorkflowRules = sequelize.define("WorkflowRules", {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    Status_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: LeadStatus,
            key: "id",
        }
    },
    ActionType: { 
        type: DataTypes.STRING,
        allowNull: false,
        comment: "email, sms, Whatsapp",
    },  
    action_data: { 
        type: DataTypes.JSON, 
        allowNull: false,
        comment: "Contains params like Template ID, etc."
    },
    Delay: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Delay in minutes after status change"
    },
    isActive: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
    }
}, {
    tableName: "WorkflowRules",
    timestamps: false,
});

// Associations

// Associate WorkflowRules to LeadStatus via Status_id
WorkflowRules.belongsTo(LeadStatus, { foreignKey: "Status_id", as: "status" }); 
LeadStatus.hasMany(WorkflowRules, { foreignKey: "Status_id", as: "workflowRules" });

// WorkflowRules to WorkFlowQueue relation
WorkflowRules.hasMany(WorkFlowQueue, { foreignKey: "workflow_ruleID", as: "queueEntries" });
WorkFlowQueue.belongsTo(WorkflowRules, { foreignKey: "workflow_ruleID", as: "workflowRule" });

/**
 * Check if there are any entries for this workflow rule in the queue.
 * @param {Number} workflowRuleId 
 * @returns {Promise<Boolean>}
 */
WorkflowRules.isInQueue = async function (workflowRuleId) {
    const count = await WorkFlowQueue.count({
        where: { workflow_ruleID: workflowRuleId }
    });
    return count > 0;
};

module.exports = WorkflowRules;
