
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_VERSION = "v17.0"; // update if Meta requires newer version
const phoneId = process.env.WHATSAPP_PHONE_ID;
const token = process.env.WHATSAPP_TOKEN;
const BASE = `https://graph.facebook.com/${API_VERSION}/${phoneId}`;

/**
 * Create a new workflow rule.
 *
 * @param {object} body - The workflow rule details { Status_id, ActionType, action_data, Delay, isActive }
 * @returns {object} - An object containing the status code, success flag, message, and created workflow rule data.
 * @throws Will throw an error if there is a database error.
 */
exports.sendTemplateMessage = async ({ to, templateName, templateComponents = [], language = "en_US" }) => {
  try {
    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: { code: language },
        components: templateComponents
      }
    };

    const resp = await axios.post(`${BASE}/messages`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      success: true,
      data: resp.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data || error.message
    };
  }
};


export async function sendTextMessage(to, text) {
  const body = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text }
  };

  try {
    const resp = await axios.post(`${BASE}/messages`, body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return resp.data;
  } catch (err) {
    const errInfo = err.response?.data || err.message;
    throw new Error(JSON.stringify(errInfo));
  }
}
