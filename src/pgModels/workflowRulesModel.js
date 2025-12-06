const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");
const Lead = require('./lead'); // Import Lead model
const WorkFlowQueue = require('./workflowQueueModel');

// models/WorkflowRules.js

const WorkflowRules = sequelize.define("WorkflowRules", {
    id: { 
        type: DataTypes.INTEGER, 
        
        autoIncrement: true 
    },
    Status_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
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

// Associate WorkflowRules to Lead via Status_id
WorkflowRules.belongsTo(Lead, { foreignKey: "Status_id", targetKey: "status_id", as: "leads" }); 
Lead.hasMany(WorkflowRules, { foreignKey: "Status_id", sourceKey: "status_id", as: "workflowRules" });

// // WorkflowRules to WorkFlowQueue relation
// WorkflowRules.hasMany(WorkFlowQueue, { foreignKey: "workflow_ruleID" });
// WorkFlowQueue.belongsTo(WorkflowRules, { foreignKey: "workflow_ruleID" });

module.exports = WorkflowRules;
