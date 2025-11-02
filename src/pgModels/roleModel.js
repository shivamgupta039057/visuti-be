const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");

const Role = sequelize.define("Role", {
  roleName: { type: DataTypes.STRING, unique: true }
});

module.exports = Role;