
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// const API_VERSION = "v17.0"; // update if Meta requires newer version
// const phoneId = process.env.WHATSAPP_PHONE_ID;
// const token = process.env.WHATSAPP_TOKEN;
// const BASE = `https://graph.facebook.com/${API_VERSION}/${phoneId}`;

// /**
//  * Create a new workflow rule.
//  *
//  * @param {object} body - The workflow rule details { Status_id, ActionType, action_data, Delay, isActive }
//  * @returns {object} - An object containing the status code, success flag, message, and created workflow rule data.
//  * @throws Will throw an error if there is a database error.
//  */
// exports.sendTemplateMessage = async ({ to, templateName, templateComponents = [], language = "en_US" }) => {
//   try {
//     const payload = {
//       messaging_product: "whatsapp",
//       to,
//       type: "template",
//       template: {
//         name: templateName,
//         language: { code: language },
//         components: templateComponents
//       }
//     };

//     const resp = await axios.post(`${BASE}/messages`, payload, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     return {
//       success: true,
//       data: resp.data
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data || error.message
//     };
//   }
// };


// export async function sendTextMessage(to, text) {
//   const body = {
//     messaging_product: "whatsapp",
//     to,
//     type: "text",
//     text: { body: text }
//   };

//   try {
//     const resp = await axios.post(`${BASE}/messages`, body, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return resp.data;
//   } catch (err) {
//     const errInfo = err.response?.data || err.message;
//     throw new Error(JSON.stringify(errInfo));
//   }
// }




const axios = require("axios");
const Lead = require("../../pgModels/lead");
const WhatsappChat = require("../../pgModels/whatsapp/WhatsappChat");
const WhatsappMessage = require("../../pgModels/whatsapp/WhatsappMessage");
const API_URL = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`;



exports.handleIncomingMessage = async (payload) => {
  const message = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!message) return;

  const phone = message.from;
  const text = message.text?.body || "";

  // 1️⃣ Find or create lead
  let lead = await Lead.findOne({ where: { phone } });
  if (!lead) {
    lead = await Lead.create({
      phone,
      source: "whatsapp"
    });
  }

  // 2️⃣ Chat
  let chat = await WhatsappChat.findOne({ where: { phone } });
  if (!chat) {
    chat = await WhatsappChat.create({
      phone,
      lead_id: lead.id,
      last_message_at: new Date()
    });
  }

  // 3️⃣ Save message
  await WhatsappMessage.create({
    chat_id: chat.id,
    direction: "IN",
    message_type: "text",
    content: text,
    meta_message_id: message.id
  });

  // 4️⃣ Update 24h window
  await chat.update({
    last_message_at: new Date(),
    is_24h_active: true
  });
};


exports.sendText = async ({ phone, text }) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text", // 🔥 REQUIRED
        text: {
          body: text
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp text:", error);
    throw error;
  }
};

exports.sendTemplate = async ({ phone, template_name, language = "en_US", }) => {
  try {
    console.log("eeeeeeeeeeeeeeddddddddddddddddddddddddd" , phone, template_name, language);
    
    const response = await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "template", // 🔥 REQUIRED
        template: {
          name: template_name,
          language: { code: language },
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
    
  } catch (error) {
    console.error("Error sending WhatsApp template:", error);
    throw error;
  }
};



exports.getChat = async () => {
  try {
    const chat = await WhatsappChat.findAll({
    order: [["updatedAt", "DESC"]],
  });

    return {
      statusCode: 200,
      success: true,
      data: chat
    };

  } catch (error) {
    return {
      statusCode: 400,
      success: false,
      message: error.message
    };
  }
};

exports.getMessagesByChatId = async (params) => {
  try {
    const { id } = params;
    const chatID =  await WhatsappMessage.findAll({
    where: { chat_id:  id },
    order: [["createdAt", "ASC"]],
  });

    return {
      statusCode: 200,
      success: true,
      data: chatID
    };

  } catch (error) {
    return {
      statusCode: 400,
      success: false,
      message: error.message
    };
  }
};



