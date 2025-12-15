// const sendWhatsAppTemplate = require('../services/sendWhatsAppTemplate');

async function executeNode(node, lead) {
  if (node.action_type === "whatsapp") {
    const templateName = node.data.template_name;

    console.log('Preparing to send WhatsApp template with the following data:');
    console.log('Recipient (to):', lead.whatsapp_number);
    console.log('Template Name:', templateName);
    console.log('Variables:', { name: lead.name });
    console.log('Full lead object:', lead);
    console.log('Node object:', node);

    const payload = {
      to: lead.whatsapp_number,
      template_name: templateName,
      variables: {
        name: lead.name
      }
    };

    console.log('Payload to be sent to sendWhatsAppTemplate:', payload);

    // await sendWhatsAppTemplate(payload);

    console.log('WhatsApp template sent successfully');
  }
}

module.exports = executeNode;
