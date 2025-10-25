const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres.config'); 

  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: "roleId" });
    User.belongsTo(models.PermissionTemplate, { foreignKey: "permissionTemplateId" });
  

  return User;
};

module.exports = User;
