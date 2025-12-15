const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres.config');
const Workflow = require('./workflow.model');

const WorkflowNode = sequelize.define("WorkflowNode", {
  node_id: DataTypes.STRING,
  node_type: DataTypes.STRING,   // trigger | action
  action_type: DataTypes.STRING, // whatsapp | status
  data: DataTypes.JSONB,
  position: DataTypes.JSONB
});

// Define associations
Workflow.hasMany(WorkflowNode);
WorkflowNode.belongsTo(Workflow);

module.exports = WorkflowNode;
