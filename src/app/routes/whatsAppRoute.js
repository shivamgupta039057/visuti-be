const express = require("express");
const router = express.Router();
const controller = require("../controllers/whatsAppController.js");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const { leadValidation } = require("../../validators/app/leadVal.js");
const upload = require('../../helper/multer');
const { uploadFile } = require("../../helper/fileUploader");

router.get('/webhook',responseHandler(controller.verifyWebhook));
router.post("/webhook", responseHandler(controller.receiveWebhook));
router.post("/send", responseHandler(controller.sendMessage));
router.get("/leads", responseHandler(controller.getLeads));
router.get("/chat/:lead_id", responseHandler(controller.getChatByLead));

module.exports = router;
