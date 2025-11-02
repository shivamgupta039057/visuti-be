const { DataTypes } = require("sequelize");
const sequelize = require("../../config/postgres.config");

const LeadStage = sequelize.define(
  "leadstage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // e.g. "Active Stage"
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: true, tableName: "leadstage" }
);


module.exports = LeadStage;