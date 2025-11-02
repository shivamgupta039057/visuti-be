const sequelize = require("../config/postgres.config");
const PermissionTemplate = require("./permissionTemplateModel");
const Permission = require("./permissionModel");

const PermissionTemplatePermission = sequelize.define("PermissionTemplate_Permission", {}, { timestamps: false });

PermissionTemplate.belongsToMany(Permission, { through: PermissionTemplatePermission });
Permission.belongsToMany(PermissionTemplate, { through: PermissionTemplatePermission });

module.exports = PermissionTemplatePermission;
