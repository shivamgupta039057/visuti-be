const express = require("express");
const router = express.Router();
const controller = require("../controllers/leadController");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const { leadValidation } = require("../../validators/app/leadVal.js");
const upload = require('../../helper/multer');
const { uploadFile } = require("../../helper/fileUploader");

router.post('/addLead', validate(leadValidation), responseHandler(controller.createLead));
router.get('/getAllLeads' , responseHandler(controller.generateLead))

module.exports = router;

