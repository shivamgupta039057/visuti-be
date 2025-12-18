// const executeAction = require("./executeAction");
// const handleCondition = require("./handleCondition");
// const WorkflowNode = require("../pgModels/workflow/workflowNode.model");
// const WorkflowEdge = require("../pgModels/workflow/workflowEdge.model");

// module.exports = async function traverse(nodeId, lead) {
//   console.log("nodeId, leadnodeId, lead" , nodeId, lead);
  

//   const node = await WorkflowNode.findOne({ where: { node_id: nodeId } });

//   console.log("ddddddnodenodenodenodenodenodenode" , node);
  

//   if (!node) return;

//     switch (node.node_type) {
//     case "CONDITION":
//       return handleCondition(node, lead);

//     case "ACTION":
//       await executeAction(node, lead);
//       break;
//   }

//   const edges = await WorkflowEdge.findAll({
//     where: { source_node_id: nodeId }
//   });

//   for (const edge of edges) {
//     await traverse(edge.target_node_id, lead);
// }
// }



const executeAction = require("./executeAction");
const handleCondition = require("./handleCondition");
const WorkflowNode = require("../pgModels/workflow/workflowNode.model");
const WorkflowEdge = require("../pgModels/workflow/workflowEdge.model");

module.exports = async function traverse(nodeId, lead, context = {}) {
  console.log("➡ Traversing node:", nodeId);

  // Prevent infinite loops
  if (context.visited?.has(nodeId)) return;
  context.visited = context.visited || new Set();
  context.visited.add(nodeId);

  const node = await WorkflowNode.findOne({
    where: { node_id: nodeId }
  });

  if (!node) return;

  // CONDITION NODE
  if (node.node_type === "CONDITION") {
    const conditionResult = await handleCondition(node, lead); // true / false

    const edge = await WorkflowEdge.findOne({
      where: {
        source_node_id: nodeId,
        condition: conditionResult ? "YES" : "NO"
      }
    });

    if (edge) {
      await traverse(edge.target_node_id, lead, context);
    }

    return;
  }

  // ACTION NODE
  if (node.node_type === "ACTION") {
    await executeAction(node, lead);
  }

  // NORMAL FLOW (no condition)
  const edges = await WorkflowEdge.findAll({
    where: { source_node_id: nodeId }
  });

  for (const edge of edges) {
    await traverse(edge.target_node_id, lead, context);
  }
};
