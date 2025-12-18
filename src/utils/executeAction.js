const WorkflowEdge = require("../pgModels/workflow/workflowEdge.model");
const executeNode = require('./EcuteNode.js');
const traverse = require('./traverse.js');

module.exports = async function executeAction(node, lead, context = {}) {
  console.log("weeeeeeeeeeeeeeeeenode, lead", node, lead);

  const data = await executeNode(node, lead);

  console.log("ryryryruddurururrdatadatadatadatadatadata", data);

  const edges = await WorkflowEdge.findAll({
    where: { source: node.node_id }
  });

  for (const edge of edges) {
    // Some edge records might use .target or .target_node_id depending on your model definition
    const targetNodeId = edge.target || edge.target_node_id || (edge.dataValues && (edge.dataValues.target || edge.dataValues.target_node_id));

    console.log("Edge target node id:", targetNodeId);

    if (!targetNodeId) {
      console.error("Target node id not found on edge", edge);
      continue;
    }

    // Defensive check as per error at code block (708-709)
    if (typeof traverse !== "function") {
      console.error('traverse is not a function (value:', traverse, ')');
      throw new Error("traverse is not a function"); // Explicitly throw
    }

    // Pass context for cycle protection (important if traverse expects it)
    await traverse(targetNodeId, lead, context);
  }
};
