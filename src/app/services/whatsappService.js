
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
const API_URL_TEMPLATE = `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates`;
const { parsePhoneNumberFromString } = require('libphonenumber-js');


exports.handleIncomingMessage = async (payload) => {
  const message = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!message) return;

   const exists = await WhatsappMessage.findOne({
    where: { meta_message_id: message.id }
  });
  if (exists) return;
  

  const phone = message.from;
  const text = message.text?.body || "";


  const numberMatch = phone.match(/\d+/);
  let whatsapp_number
  if (numberMatch) {
    const phoneNumber = parsePhoneNumberFromString(`+${numberMatch[0]}`);
    whatsapp_number = phoneNumber.nationalNumber
      // console.log("Country Code:", phoneNumber.countryCallingCode);
      // console.log("National Number:", phoneNumber.nationalNumber);
      // console.log("Country:", phoneNumber.country);
    
  }
  // 1️⃣ Find or create lead
  let lead = await Lead.findOne({ where: { whatsapp_number } });

  if (!lead) {
    lead = await Lead.create({
      whatsapp_number,
      source: "whatsapp"
    });
  }

  // 2️⃣ Chat
  let chat = await WhatsappChat.findOne({ where: { phone: whatsapp_number } });
  if (!chat) {
    chat = await WhatsappChat.create({
      phone: whatsapp_number,
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

      const chat = await getOrCreateChat(phone);

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
   await WhatsappMessage.create({
      chat_id: chat.id,
      direction: "OUT",
      message_type: "text",
      content: text,
      meta_message_id: response.data?.messages?.[0]?.id // WhatsApp message id
    });

    // 4️⃣ Update chat
    await chat.update({
      last_message_at: new Date(),
      is_24h_active: true
    });

    
    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp text:", error);
    throw error;
  }
};

exports.sendTemplate = async ({ phone, template_name, language = "en_US", }) => {
  try {
  const chat = await getOrCreateChat(phone);
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
    await WhatsappMessage.create({
      chat_id: chat.id,
      direction: "OUT",
      message_type: "template",
      content: template_name,
      meta_message_id: response.data?.messages?.[0]?.id
    });

    await chat.update({
      last_message_at: new Date(),
      is_24h_active: true
    });

    return response.data;

  } catch (error) {
    console.error("Error sending WhatsApp template:", error);
    throw error;
  }
};



exports.getChat = async () => {
  try {
    // Find all chats with newest first, include Lead info if available for each chat's lead_id
    const chats = await WhatsappChat.findAll({
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: require("../../pgModels/lead"),
          as: "lead", // You may need to set up the association for this to work!
        },
      ],
    });

    return {
      statusCode: 200,
      success: true,
      data: chats
    };

  } catch (error) {
    return {
      statusCode: 400,
      success: false,
      message: error.message
    };
  }
};


exports.getTemplates = async (query) => {
  console.log("ddddddddddddddddddddddddddddddddddd" , query);
  
  try {
    const response = await axios.get(
      API_URL_TEMPLATE,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("`responseresponseresponse`" , response.data);
    

    return {
      statusCode: 200,
      success: true,
      data: response.data
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
    const chatID = await WhatsappMessage.findAll({
      where: { chat_id: id },
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



async function getOrCreateChat(phone) {
    const numberMatch = phone.match(/\d+/);
  let whatsapp_number
  if (numberMatch) {
    const phoneNumber = parsePhoneNumberFromString(`+${numberMatch[0]}`);
    whatsapp_number = phoneNumber.nationalNumber
  }
  let lead = await Lead.findOne({ where: { whatsapp_number } });

  if (!lead) {
    lead = await Lead.create({
      whatsapp_number,
      source: "whatsapp"
    });
  }

  let chat = await WhatsappChat.findOne({
    where: { phone: whatsapp_number }
  });

  if (!chat) {
    chat = await WhatsappChat.create({
      phone: whatsapp_number,
      lead_id: lead.id,
      last_message_at: new Date(),
      is_24h_active: true
    });
  }

  return chat;
}


