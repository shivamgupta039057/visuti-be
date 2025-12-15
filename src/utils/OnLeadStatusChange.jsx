const WorkflowNode = require('../pgModels/workflow/workflowNode.model');
const WorkflowEdge = require('../pgModels/workflow/workflowEdge.model');
const executeNode = require('./EcuteNode.jsx');

async function OnLeadStatusChange(lead) {
  // 1. Find workflows matching this status
  const statusNodes = await WorkflowNode.findAll({
    where: {
      action_type: "Lead Status",
      data: {
        status_id: lead.id
      }
    }
  });

  for (const statusNode of statusNodes) {
    // 2. Find connected nodes (edges)
    const edges = await WorkflowEdge.findAll({
      where: { source_node_id: statusNode.node_id }
    });

    for (const edge of edges) {
      const nextNode = await WorkflowNode.findOne({
        where: { node_id: edge.target_node_id }
      });

      // 3. Execute next action
      await executeNode(nextNode, lead);
    }
  }
}

module.exports = OnLeadStatusChange;
