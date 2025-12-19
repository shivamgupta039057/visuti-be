const traverse = require("./traverse");
const WorkflowEdge = require("../pgModels/workflow/workflowEdge.model");
module.exports = async function handleCondition(node, lead, visited) {
  console.log("ddkddkddnodenodenodenodenodenodenode" , node , visited);
  
  const { field, operator, value } = node.data.selectedData || {};

  console.log("dddddfffffffffffffffffffffffffffffffffffffff" , node.data.selectedData);
  

  let result = false;

  switch (operator) {
    case "equals":
      result = lead[field] === value;
      break;
    case "not_equals":
      result = lead[field] !== value;
      break;

    case "contains":
      result = (lead[field] || "").includes(value);
      break;
  }

  console.log("resultresultresultresult" , result);
  console.log("node.node_idnode" , node.node_id);
  

  const edge = await WorkflowEdge.findOne({
    where: {
      source: node.node_id,
      condition: result ? "YES" : "NO"
    }
  });

  console.log("dffffffffffffffffffedgeedgeedgeedgeedge" , edge);
  

  if (edge) {
    await traverse(edge.target, lead);
  }
}
