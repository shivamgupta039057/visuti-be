const executeAction = require("./executeAction");
const handleCondition = require("./handleCondition");
const WorkflowNode = require("../pgModels/workflow/workflowNode.model");
const WorkflowEdge = require("../pgModels/workflow/workflowEdge.model");

module.exports = async function traverse(nodeId, lead, visited) {
  console.log(
    "nodeId, lead, visitednodeId, lead, visitednodeId, lead, visited",
    nodeId,
    lead,
    visited
  );

  if (visited.has(nodeId)) return;
  visited.add(nodeId);

  console.log(visited, "visteddsdsdsd");

  const node = await WorkflowNode.findOne({ where: { node_id: nodeId } });

  console.log(node, "nodeeeee");
  if (!node) return;

  // Will hold the last non-undefined result from actions/children
  let result;

  if (node.node_type === "condition") {
    // Let conditions decide which branch to follow and propagate any result
    result = await handleCondition(node, lead, visited);
  }
   else if (node.node_type === "ACTION") {
    console.log("dddddddddddd");
    // Capture any return value from the action (e.g. selectedData.label)
    result = await executeAction(node, lead);
  }

  console.log(visited, "ssssssssssss");
  // Continue to next nodes
  const edges = await WorkflowEdge.findAll({
    where: { source: nodeId },
  });
  console.log(edges, "eeeeeeeeeeee");

  for (const edge of edges) {
    const childResult = await traverse(edge.target, lead, visited);
    if (childResult !== undefined) {
      result = childResult;
    }
  }

  return result;
};