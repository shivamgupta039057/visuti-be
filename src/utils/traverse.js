const executeAction = require("./executeAction");
const handleCondition = require("./handleCondition");
const WorkflowNode = require("../pgModels/workflow/workflowNode.model");
const WorkflowEdge = require("../pgModels/workflow/workflowEdge.model");

module.exports = async function traverse(nodeId, lead, visited) {

  if (visited.has(nodeId)) return;
  visited.add(nodeId);

  const node = await WorkflowNode.findOne({ where: { node_id: nodeId } });

  if (!node) return;

  // switch (node.node_type) {
  //   case "condition":
  //     return handleCondition(node, lead);

  //   case "ACTION":
  //     await executeAction(node, lead);
  //     break;

  //   case "trigger":
  //     break;
  // }

    if (node.node_type === "condition") {
    return handleCondition(node, lead, visited);
  }

  if (node.node_type === "action") {
    await executeAction(node, lead);
  }


  // Continue to next nodes
  const edges = await WorkflowEdge.findAll({
    where: { source: nodeId }
  });

  for (const edge of edges) {
    await traverse(edge.target, lead,visited);
  }
}
