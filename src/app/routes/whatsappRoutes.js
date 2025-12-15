const express = require("express");
const router = express.Router();
const controller = require("../controllers/whatsappController.js");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const { leadValidation } = require("../../validators/app/leadVal.js");
const upload = require('../../helper/multer');
const { uploadFile } = require("../../helper/fileUploader");

router.post('/webhook',responseHandler(controller.handleWebhook));
router.get('/webhook',responseHandler(controller.verifyWebhook));

module.exports = router;