const { traverse } = require("./traverse");

export async function handleCondition(node, lead) {
  const { field, operator, value } = node.data;

  let result = false;

  switch (operator) {
    case "equals":
      result = lead[field] === value;
      break;
    case "not_equals":
      result = lead[field] !== value;
      break;
  }

  const edge = await WorkflowEdge.findOne({
    where: {
      source_node_id: node.node_id,
      condition: result ? "YES" : "NO"
    }
  });

  if (edge) {
    await traverse(edge.target_node_id, lead);
  }
}
