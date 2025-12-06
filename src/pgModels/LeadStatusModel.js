const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");
// models/LeadStatus.js
module.exports = (sequelize, DataTypes) => {
  const LeadStatus = sequelize.define("LeadStatus", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: DataTypes.STRING
  }, {
    tableName: "Leads_Status",
  });

  LeadStatus.associate = (models) => {
    LeadStatus.hasMany(models.WorkflowRules, { foreignKey: "Status_id" });
    LeadStatus.hasMany(models.Leads, { foreignKey: "Status_id" });
  };

  return LeadStatus;
};
