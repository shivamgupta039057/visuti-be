const onLeadStatusChange = require("./onLeadStatusChange");
// const sendWhatsAppMessage = require("../services/whatsapp");

module.exports = async function executeAction(node, lead) {
  switch (node.action_type) {

    // ================== WHATSAPP ==================
    case "whatsapp": {
      const { template_id, variables } = node.data || {};

      console.log("📲 Sending WhatsApp to", lead.phone);

      // await sendWhatsAppMessage({ template_id, variables, lead });
      break;
    }

    // ================== STATUS UPDATE ==================
    case "status": {
      const { status_id } = node.data || {};
      if (!status_id) return;

      console.log("🔄 Updating lead status to", status_id);

      // await Lead.update({ status_id }, { where: { id: lead.id } });

      await onLeadStatusChange(
        { ...lead, status_id },
        status_id
      );
      break;
    }

    // ================== DELAY ==================
    case "delay": {
      const { minutes } = node.data || {};
      console.log(`⏳ Delay for ${minutes} minutes`);

      // Here push to BullMQ / Agenda
      break;
    }

    default:
      console.warn("Unknown action:", node.action_type);
  }
};
