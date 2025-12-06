const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");
// models/Templates.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Templates", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: DataTypes.STRING,
    Subject: DataTypes.STRING,
    Body_Text: DataTypes.TEXT,
    Image: DataTypes.STRING,
    Variables: DataTypes.JSON,
  }, {
    tableName: "Templates",
  });
};
