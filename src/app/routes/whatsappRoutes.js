const express = require("express");
const router = express.Router();
const controller = require("../controllers/whatsappController.js");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const { leadValidation } = require("../../validators/app/leadVal.js");
const upload = require('../../helper/multer');
const { uploadFile } = require("../../helper/fileUploader");

router.get('/webhook',responseHandler(controller.verifyWebhook));
router.post('/webhook',responseHandler(controller.receiveMessage));
// new workflwo data
router.post('/send-text',responseHandler(controller.sendText));
router.post('/send-template', responseHandler(controller.sendTemplate));


router.get('/chats',responseHandler(controller.getChat));
router.get('/get-template',responseHandler(controller.getTemplates));
router.get('/messages/:id',responseHandler(controller.getMessagesByChatId));



module.exports = router;