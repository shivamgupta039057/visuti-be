const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres.config");

const WhatsAppMessage = sequelize.define(
  "WhatsAppMessage",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    direction: {
      type: DataTypes.ENUM("inbound", "outbound"),
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    type: {
      type: DataTypes.STRING, // text, image, audio, video, document, template
      allowNull: true,
    },

    media_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    whatsapp_msg_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    raw: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "whatsapp_messages",
  }
);

module.exports = WhatsAppMessage;
