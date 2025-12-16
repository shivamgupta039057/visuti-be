import { executeAction } from "./executeAction";
import { handleCondition } from "./handleCondition";

export async function traverse(nodeId, lead) {
  const node = await WorkflowNode.findOne({ where: { node_id: nodeId } });

  if (!node) return;

  switch (node.node_type) {
    case "condition":
      return handleCondition(node, lead);

    case "ACTION":
      await executeAction(node, lead);
      break;

    case "trigger":
      break;
  }

  // Continue to next nodes
  const edges = await WorkflowEdge.findAll({
    where: { source_node_id: nodeId }
  });

  for (const edge of edges) {
    await traverse(edge.target_node_id, lead);
  }
}
