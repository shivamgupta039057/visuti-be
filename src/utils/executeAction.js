async function executeAction(node, lead) {
  if (!node || node.node_type?.toLowerCase() !== "action") return;

  switch (node.action_type) {

    // =============================
    // 1. SEND WHATSAPP MESSAGE
    // =============================
    case "whatsapp": {
      const { template_id, language = "en", variables = [] } = node.data || {};

      if (!template_id) {
        console.error("WhatsApp template_id missing");
        return;
      }

      await sendWhatsAppMessage({
        to: lead?.mobileNumber || lead?.phone || lead?.data?.mobileNumber || lead?.data?.phone,
        template_id,
        language,
        variables,
        lead
      });

      break;
    }

    // =============================
    // 2. UPDATE LEAD STATUS
    // =============================
    case "status": {
      const { status_id } = node.data || {};

      if (!status_id) return;

      await Lead.update(
        { status_id },
        { where: { id: lead.id } }
      );

      // 🔥 VERY IMPORTANT
      // Trigger next workflows due to status change
      await onLeadStatusChange({
        ...lead,
        status_id
      }, status_id);

      break;
    }

    // =============================
    // 3. DELAY (handled by queue)
    // =============================
    case "delay": {
      const { minutes = 0 } = node.data || {};

      await WorkflowQueue.create({
        node_id: node.node_id,
        lead_id: lead.id,
        execute_at: new Date(Date.now() + minutes * 60 * 1000)
      });

      break;
    }

    default:
      console.warn("Unknown action type:", node.action_type);
  }
}