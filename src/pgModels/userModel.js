const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres.config'); 
const Role = require("./roleModel");
const PermissionTemplate = require("./permissionTemplateModel");

const User = sequelize.define("User", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
     allowNull: false
  },
  name: DataTypes.STRING,
  initials:DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  phone: DataTypes.STRING
});

User.belongsTo(Role, { foreignKey: "roleId" });
User.belongsTo(PermissionTemplate, { foreignKey: "permissionTemplateId" });

module.exports = User;
