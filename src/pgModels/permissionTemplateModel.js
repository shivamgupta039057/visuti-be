const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");

const PermissionTemplate = sequelize.define("PermissionTemplate", {
  templateName: { type: DataTypes.STRING, unique: true }
});

module.exports = PermissionTemplate;
