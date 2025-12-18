const WorkflowNode = require('../pgModels/workflow/workflowNode.model.js');
const WorkflowEdge = require('../pgModels/workflow/workflowEdge.model.js');
const executeNode = require('./EcuteNode.js');
const  traverse  = require('./traverse.js');

module.exports = async function OnLeadStatusChange(lead, status) {
  console.log("Lead status changed:", status);

  const statusNodes = await WorkflowNode.findAll({
    where: {
      
      action_type: "Lead Status",
      // Use Sequelize's JSON querying for nested fields
      'data.selectedData.id': status
    }
  });

  if (!statusNodes || statusNodes.length === 0) return;

  for (const status of statusNodes) {
   
    const nodeId = status.node_id || (status.dataValues && status.dataValues.node_id);
    const leadData = lead && lead.dataValues ? lead.dataValues : lead;

    console.log("leadDatanodeIdnodeId" , nodeId , leadData );
    
    await traverse(nodeId, leadData);
  }
};
