const sequelize = require('../config/postgres.config')
require("./roleModel");
require("./permissionModel");
require("./permissionTemplateModel");
require("./userModel");
require("./permissionTemplatePermissionModel");
require("./rolePermission");
const initDB = async () => {
    try {
        await sequelize.authenticate();
      console.log('Pg DataBase connected successfully');

        await sequelize.sync({ alter: true });
        console.log("Table synced successfully")
    } catch (err) {
        console.log("Database connection Failed", err)
    }
}

module.exports=initDB