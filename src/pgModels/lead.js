const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");

const LeadStage = require("./LeadStages/LeadStage");
const LeadStatus = require("./LeadStages/leadStatus");
const LeadReason = require("./LeadStages/leadReason");
const User = require("./userModel");

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,  // store form data dynamically
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatsapp_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    assignedTo: {
      type: DataTypes.INTEGER, // User ID
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: LeadStage,
        key: "id",
      },
    },
    status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: LeadStatus,
        key: "id",
      },
      allowNull: true,
    },
    reason_id: {
      type: DataTypes.INTEGER,
      references: {
        model: LeadReason,
        key: "id",
      },
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER, // admin/user ID who created this lead
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "leads",
  }
);


Lead.belongsTo(LeadStage, { foreignKey: "stage_id", as: "stage" });
Lead.belongsTo(LeadStatus, { foreignKey: "status_id", as: "status" });
Lead.belongsTo(LeadReason, { foreignKey: "reason_id", as: "reason" });
Lead.belongsTo(User, { foreignKey: "assignedTo", as: "assignedUser" });
Lead.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Lead, { foreignKey: "assignedTo", as: "assignedLeads" });
User.hasMany(Lead, { foreignKey: "created_by", as: "createdLeads" });

module.exports = Lead;
