const { statusCode, resMessage } = require("../../config/default.json");
const { PermissionTemplateModel,UserModel } = require("../../pgModels/index");


exports.getPermssionTemplates = async () => {
  try {

    // const roles = await PermissionTemplateModel.findAll();
    const templates = await PermissionTemplateModel.findAll({
    include: [{ model: UserModel, as: 'users', attributes: ['id'] }]
  });

  let roles= templates.map(t => ({
    id: t.id,
    name: t.templateName,
    permissions: t.permissions,
    assignTo: t.users.length,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  }));

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Permission Template",
      data: roles,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.getTemplatesName = async () => {
  try {
    const templates = await PermissionTemplateModel.findAll({
      attributes: ['templateName', 'id']
    });

    const templateNames = templates.map(t => ({
      id: t.id,
      templateName: t.templateName
    }));

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Template Names",
      data: templateNames,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.createPermissionTemplate = async (body) => {
  try {
    const { templateName } = body;

    // Default permission structure
    const defaultPermissions = {
      lead: {
        manage: "NO",
        delete: "NO",
        export: "NO"
      },
      team: {
        viewUsers: "NO",
        addUsers: "NO"
      },
      reports: {
        viewDashboard: "NO",
        createDashboard: "NO"
      }
    };

    const template = await PermissionTemplateModel.create({
      templateName,
      permissions: defaultPermissions
    });


    return {
      statusCode: statusCode.OK,
      success: true,
      message: 'Template created with default permissions',
      data: template,
    };


  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.updatePermissionTemplate = async (param, body) => {
  try {
    const { id } = param;

    const template = await PermissionTemplateModel.findByPk(id);
    if (!template) throw new Error('Template not found');
    template.permissions = body.permissions || template.permissions;
    await template.save();

    return {
      statusCode: statusCode.OK,
      success: true,
      message: 'Template Permission Edited',
      data: template,
    };


  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};