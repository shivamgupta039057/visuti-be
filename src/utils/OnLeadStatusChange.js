const WorkflowNode = require('../pgModels/workflow/workflowNode.model.js');
const WorkflowEdge = require('../pgModels/workflow/workflowEdge.model.js');
const executeNode = require('./EcuteNode.jsx');
const  traverse  = require('./traverse.js');

module.exports = async function OnLeadStatusChange(lead, status) {
  console.log("Lead status changed:", status);

  // 1. Find workflows (nodes) whose trigger matches this lead status.
  // const triggerNodes = await WorkflowNode.findAll({
  //   where: {
  //     action_type: 'Lead Status',
  //     'data.selectedData.id': status
  //   }
  // });

const triggerNodes = await WorkflowNode.findAll({
    where: {
      node_type: "trigger",
      action_type: "Lead Status",
      [Sequelize.Op.and]: [
        sequelize.where(
          sequelize.json("data.selectedData.id"),
          status
        )
      ]
    }
  });


  if (!triggerNodes || triggerNodes.length === 0) return;

  for (const trigger of triggerNodes) {
   
    const nodeId = trigger.node_id || (trigger.dataValues && trigger.dataValues.node_id);
    const leadData = lead && lead.dataValues ? lead.dataValues : lead;

    await traverse(nodeId, leadData,new Set());
  }
};
