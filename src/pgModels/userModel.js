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
  phone: DataTypes.STRING,
   reportingTo: {           // 👈 allow empty "Reporting To"
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

User.belongsTo(Role, { foreignKey: "roleId" ,as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });

User.belongsTo(PermissionTemplate, { foreignKey: "permissionTemplateId",as: 'template' });
PermissionTemplate.hasMany(User, { foreignKey: 'permissionTemplateId', as: 'users' });
// Self-referencing association for manager/reportees


User.hasMany(User, { as: "reportees", foreignKey: "reportingTo" }); // Users reporting to this user
User.belongsTo(User, { as: "manager", foreignKey: "reportingTo" });


module.exports = User;
