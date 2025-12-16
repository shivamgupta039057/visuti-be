const WorkflowNode = require('../pgModels/workflow/workflowNode.model.js');
const WorkflowEdge = require('../pgModels/workflow/workflowEdge.model.js');
const executeNode = require('./EcuteNode.jsx');
const { traverse } = require('./traverse.jsx');

module.exports = async function OnLeadStatusChange(lead, status) {
  console.log("Lead status changed:", status);

  // 1. Find workflows (nodes) whose trigger matches this lead status.
  const triggerNodes = await WorkflowNode.findAll({
    where: {
      action_type: 'Lead Status',
      'data.selectedData.id': status
    }
  });

  if (!triggerNodes || triggerNodes.length === 0) return;

  for (const trigger of triggerNodes) {
    // You may receive either a model instance or plain object depending on your query config.
    // Use node_id directly if present, otherwise from .dataValues.
    const nodeId = trigger.node_id || (trigger.dataValues && trigger.dataValues.node_id);

    // Use lead.dataValues if lead is a Sequelize instance, otherwise just lead
    const leadData = lead && lead.dataValues ? lead.dataValues : lead;

    await traverse(nodeId, leadData);
  }
};
