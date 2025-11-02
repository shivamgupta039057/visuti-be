const { statusCode, resMessage } = require("../../config/default.json");
const bcrypt = require("bcrypt");
const Role = require("../../pgModels/roleModel");
const PermissionTemplate = require("../../pgModels/permissionTemplateModel");
const UserModel=require('../../pgModels/userModel')
const jwt = require("jsonwebtoken");


exports.addUser = async (body) => {
  try {
    
     const { name, email, password, phone, roleId, permissionTemplateId ,initials} = body;


      const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Email already exists",
      };
    }
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(400).json({ message: "Invalid roleId" });
    }

  
    const permissionTemplate = await PermissionTemplate.findByPk(permissionTemplateId);
    if (!permissionTemplate) {
      return res.status(400).json({ message: "Invalid permissionTemplateId" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      initials,
      password: hashPassword,
      phone,
      roleId,
      permissionTemplateId
    });


    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Add",
      data: user,
    };
  } catch (error) {
    console.log(error,"eeeeeeeee")
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

exports.getUserList = async () => {
  try {
    // Fetch all users with associated role and permission template
    const users = await UserModel.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Role,
          attributes: ['id', 'roleName'], // Only include role ID and roleName
        },
        {
          model: PermissionTemplate,
          attributes: ['id', 'templateName'], // Only include template ID and templateName
        },
      ],
      order: [['createdAt', 'DESC']], // Optional: newest users first
    });

    // Return formatted response
    return {
      statusCode: statusCode.OK,
      success: true,
      message: "User list fetched successfully",
      data: users,
    };

  } catch (error) {
    console.log(error, "getUserList error");
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.editUser = async (params, body) => {
  try {
    const {id}=params
    const { name, email, password, phone, roleId, permissionTemplateId,initials } = body;

    // ✅ Find the user first
    const user = await UserModel.findByPk(id);
    if (!user) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "User not found",
      };
    }

    // ✅ Check if email already exists (and is not the current user's email)
    if (email && email !== user.email) {
      const existingUser = await UserModel.findOne({ where: { email } });
      if (existingUser) {
        return {
          statusCode: statusCode.BAD_REQUEST,
          success: false,
          message: "Email already exists",
        };
      }
    }

    // ✅ Validate roleId if provided
    if (roleId) {
      const role = await Role.findByPk(roleId);
      if (!role) {
        return {
          statusCode: statusCode.BAD_REQUEST,
          success: false,
          message: "Invalid roleId",
        };
      }
    }

    // ✅ Validate permissionTemplateId if provided
    if (permissionTemplateId) {
      const permissionTemplate = await PermissionTemplate.findByPk(permissionTemplateId);
      if (!permissionTemplate) {
        return {
          statusCode: statusCode.BAD_REQUEST,
          success: false,
          message: "Invalid permissionTemplateId",
        };
      }
    }

    // ✅ Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.roleId = roleId || user.roleId;
    user.initials=initials||user.initials;
    user.permissionTemplateId = permissionTemplateId || user.permissionTemplateId;

    // ✅ If new password provided, hash it
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // ✅ Save updated user
    await user.save();

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "User updated successfully",
      data: user,
    };

  } catch (error) {
    console.log(error, "editUser error");
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};


exports.loginUser = async (body) => {
  try {
    const { email, password } = body;

    // ✅ Check if email & password provided
    if (!email || !password) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Email and password are required",
      };
    }

    // ✅ Find user by email
    const user = await UserModel.findOne({
      where: { email },
      include: [
        { model: Role, attributes: ["id", "roleName"] },
        { model: PermissionTemplate, attributes: ["id", "templateName"] },
      ],
    });

    if (!user) {
      return {
        statusCode: statusCode.UNAUTHORIZED,
        success: false,
        message: "Invalid email or password",
      };
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        statusCode: statusCode.UNAUTHORIZED,
        success: false,
        message: "Invalid email or password",
      };
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      process.env.SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN } // 1 day expiry
    );

    // ✅ Return success response
    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.Role ? user.Role.name : null,
          permissionTemplate: user.PermissionTemplate ? user.PermissionTemplate.name : null,
        },
      },
    };
  } catch (error) {
    console.log(error, "loginUser error");
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};
