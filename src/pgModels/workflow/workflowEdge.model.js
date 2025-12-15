const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres.config');
const Workflow = require('./workflow.model');

const WorkflowEdge = sequelize.define("WorkflowEdge", {
  source: DataTypes.STRING,
  target: DataTypes.STRING
});

// Define associations
Workflow.hasMany(WorkflowEdge);
WorkflowEdge.belongsTo(Workflow);

module.exports = WorkflowEdge;
