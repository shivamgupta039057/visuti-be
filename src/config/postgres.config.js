const { Sequelize } = require("sequelize");
const devConfig = require('./dev.config');

// console.log(devConfig.PG_PASS , "devConfig");

// const sequelize = new Sequelize(
//   devConfig.PG_DB,      // Database name
//   devConfig.PG_USER,    // Username
//   devConfig.PG_PASS,    // Password
//   {
//     host: devConfig.PG_HOST,
//     dialect: "postgres",
//     logging: false, // Disable SQL logs
//   }
// );
const sequelize = new Sequelize(
  devConfig.PG_DB,
  devConfig.PG_USER,
  devConfig.PG_PASS,
  {
    host: devConfig.PG_HOST,
    dialect: devConfig.PG_DIALECT,
    logging: false,
  }
);


// console.log(sequelize , "sequelize");

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected");
  } catch (err) {
    console.error("❌ `PostgreSQL` Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectPostgres };
