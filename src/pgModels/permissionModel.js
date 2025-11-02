const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");

const Permission = sequelize.define("Permission", {
  name: { type: DataTypes.STRING, unique: true }
});

module.exports = Permission;
