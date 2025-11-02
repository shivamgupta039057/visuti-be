const { Joi } = require('express-validation');

// Validation schema for Home Page details according to StudentModel
exports.addUserVal = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    phone:Joi.string().required(),
    roleId:Joi.string().required(),
    permissionTemplateId:Joi.string().required(),
    initials:Joi.string().required()
});
