const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");

const PermissionTemplate = sequelize.define("PermissionTemplate", {
  templateName: {
    type: DataTypes.STRING,
    unique: true
  },
  permissions: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  // tableName: 'permission_templates',
  timestamps: true
});

module.exports = PermissionTemplate;
