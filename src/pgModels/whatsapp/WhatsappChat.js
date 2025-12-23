const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres.config');

const WhatsappChat = sequelize.define("WhatsappChat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lead_id: DataTypes.INTEGER,
  phone: DataTypes.STRING,
  last_message_at: DataTypes.DATE,
  is_24h_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  unread_count: {
    type:DataTypes.INTEGER,
    defaultValue: 0
  }
 
  
}, {
    tableName: 'WhatsappChats',
    timestamps: true
  });

module.exports = WhatsappChat;
