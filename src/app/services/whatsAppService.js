const { statusCode, resMessage } = require("../../config/default.json");
const {  Lead, WhatsAppMessage,WebhookLog,sequelize} = require("../../pgModels/index");
const axios = require("axios");



exports.sendWhatsAppMessage = async (lead_id, message) => {
  try {
    const lead = await Lead.findByPk(lead_id);
    if (!lead) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Lead not found",
      };
    }

    const phone = lead.data?.phone;
    if (!phone) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Lead phone number not found in JSONB data",
      };
    }

    const url = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_ID}/messages`;
    
    const payload = {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { body: message },
    };

    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` },
    });

    // Save outbound message
    await WhatsAppMessage.create({
      lead_id,
      direction: "outbound",
      type: "text",
      message,
      whatsapp_msg_id: response.data.messages?.[0]?.id || null,
      raw: response.data,
    });

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Message sent successfully",
      data: response.data,
    };
  } catch (err) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: err.message,
    };
  }
};


/* ============================================================
    1. VERIFY WEBHOOK (GET)
============================================================ */
exports.verifyWebhook = async (query) => {
  try {
    const mode = query["hub.mode"];
    const token = query["hub.verify_token"];
    const challenge = query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.FB_VERIFY_TOKEN) {
      return {
        statusCode: statusCode.OK,
        success: true,
        message: "Webhook Verified",
        data: challenge,
      };
    }

    return {
      statusCode: statusCode.UNAUTHORIZED,
      success: false,
      message: "Webhook Verification Failed",
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

/* ============================================================
    2. RECEIVE WEBHOOK (POST)
============================================================ */
exports.receiveWebhook = async (body) => {
  try {
    console.log("Incoming Webhook:", JSON.stringify(body, null, 2));

    // Save webhook log (optional but useful)
    await WebhookLog.create({ payload: body });

    const entry = body.entry?.[0]?.changes?.[0]?.value;
    if (!entry) {
      return {
        statusCode: statusCode.OK,
        success: true,
        message: "No message in webhook",
      };
    }

    const msg = entry.messages?.[0];
    const contact = entry.contacts?.[0];

    if (!msg) {
      return {
        statusCode: statusCode.OK,
        success: true,
        message: "No WhatsApp user message",
      };
    }

    const wa_id = msg.from;
    const customerName = contact?.profile?.name || "Unknown";

    // Try finding lead using JSONB field
    let lead = await Lead.findOne({
      where: sequelize.where(
        sequelize.json("data.phone"),
        wa_id
      ),
    });

    // If lead not found → create new
    if (!lead) {
      lead = await Lead.create({
        data: { phone: wa_id, name: customerName },
        source: "whatsapp",
      });
    }

    // Save inbound message in database
    await WhatsAppMessage.create({
      lead_id: lead.id,
      direction: "inbound",
      type: msg.type,
      message: msg.text?.body || null,
      whatsapp_msg_id: msg.id,
      raw: msg,
    });

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Message received and saved.",
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

/* ============================================================
    3. SEND MESSAGE (POST)
============================================================ */
exports.sendMessage = async (body) => {
  try {
    const { lead_id, message } = body;

    if (!lead_id || !message) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "lead_id and message are required",
      };
    }

    const lead = await Lead.findByPk(lead_id);
    if (!lead) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Lead not found",
      };
    }

    const phone = lead.data?.phone;
    if (!phone) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Lead phone number missing in JSONB data",
      };
    }

    const url = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { body: message },
    };

    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` },
    });

    // Save outbound message
    await WhatsAppMessage.create({
      lead_id,
      direction: "outbound",
      type: "text",
      message,
      whatsapp_msg_id: response.data.messages?.[0]?.id || null,
      raw: response.data,
    });

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Message sent successfully.",
      data: response.data,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

/* ============================================================
    4. GET LEADS (CHAT SIDEBAR)
============================================================ */
exports.getLeads = async () => {
  try {
    const leads = await Lead.findAll({
      order: [["updatedAt", "DESC"]],
    });

    return {
      statusCode: statusCode.OK,
      success: true,
      data: leads,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

/* ============================================================
    5. GET CHAT HISTORY (ONE LEAD)
============================================================ */
exports.getChatByLead = async (lead_id) => {
  try {
    const messages = await WhatsAppMessage.findAll({
      where: { lead_id },
      order: [["createdAt", "ASC"]],
    });

    return {
      statusCode: statusCode.OK,
      success: true,
      data: messages,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};
