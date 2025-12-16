const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");

const WebhookLog = sequelize.define(
  "WebhookLog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "webhook_logs",
  }
);

module.exports = WebhookLog;
