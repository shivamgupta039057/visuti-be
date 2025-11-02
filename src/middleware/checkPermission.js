const Role = require("../pgModels/roleModel");
const Permission = require("../pgModels/permissionModel");

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    const role = await Role.findByPk(req.user.roleId, {
      include: Permission
    });

    const allowed = role.Permissions.some((p) => p.name === permissionName);

    if (!allowed) return res.status(403).json({ error: "Permission denied" });

    next();
  };
};

module.exports = checkPermission;
