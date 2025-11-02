const sequelize = require("../config/postgres.config");
const Role = require("./roleModel");
const Permission = require("./permissionModel");

const RolePermission = sequelize.define("Role_Permission", {}, { timestamps: false });

Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });

module.exports = RolePermission;
