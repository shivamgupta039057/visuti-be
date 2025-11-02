const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");
const Plan = require("./plan");
const Lead = require("../lead");

const LeadPayment = sequelize.define(
  "LeadPayment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lead_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    plan_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_installment: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    received_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    proof: {
      type: DataTypes.STRING, // file path or URL
      allowNull: true,
    },
    payment_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "cancelled"),
      defaultValue: "pending",
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true, // counselor ID
    },
  },
  {
    timestamps: true,
  }
);

// 🎯 Relationships
LeadPayment.belongsTo(Lead, { foreignKey: "lead_id", as: "lead" });
LeadPayment.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

module.exports = LeadPayment;
