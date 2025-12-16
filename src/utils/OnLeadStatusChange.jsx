const WorkflowNode = require('../pgModels/workflow/workflowNode.model');
const WorkflowEdge = require('../pgModels/workflow/workflowEdge.model');
const executeNode = require('./EcuteNode.jsx');

module.exports = async function OnLeadStatusChange(lead , status) {
  console.log("lerddddd"  , status);
  
  // 1. Find workflows matching this status
  // Correction: 'data' is usually a JSON column, query needs Sequelize's JSON operators.
  const statusNodes = await WorkflowNode.findAll({
    where: {
      
      action_type: "Lead Status",
      // Use Sequelize's JSON querying for nested fields
      'data.selectedData.id': status
    }
  });

  if(!statusNodes) return;

  // console.log("ssjssjsjssjsstatusNodesstatusNodesstatusNodes" , statusNodes);
  

  for (const statusNode of statusNodes) {    
    // 2. Find connected nodes (edges)
    const edges = await WorkflowEdge.findAll({
      where: { source : statusNode.dataValues.node_id }
    });

    console.log("edgesedgesedgesedgesedgesedges" , edges);
    

    for (const edge of edges) {
      const nextNode = await WorkflowNode.findOne({
        where: { node_id: edge.dataValues.target }
      });

      // console.log("nextNodenextNodenextNodenextNodenextNode" , nextNode);
      

      // 3. Execute next action
     const data =  await executeNode(nextNode.dataValues, lead.dataValues);
     console.log("dddddddddddddddddddddddd" , data);
     return data;
     
    }
  }
}


