const { DataTypes } = require("sequelize");
const sequelize = require("../../config/postgres.config");
const LeadStatus = require("./leadStatus");

const LeadReason = sequelize.define("lead_reasons", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "lead_statuses",
      key: "id",
    },
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false, // e.g. "Not Interested", "Wrong Contact"
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: true, // for drag-and-drop order,
    defaultValue : 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
},{ timestamps: true, tableName: "lead_reasons" });

LeadStatus.hasMany(LeadReason, {
  foreignKey: "status_id",
  as: "reasons",
});

LeadReason.belongsTo(LeadStatus, {
  foreignKey: "status_id",
  as: "status",
});

module.exports = LeadReason;