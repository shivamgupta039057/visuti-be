const express = require("express");
const router = express.Router();
const controller = require("../controllers/leadController");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const { leadValidation } = require("../../validators/app/leadVal.js");
const upload = require('../../helper/multer');
const { uploadFile } = require("../../helper/fileUploader");

router.post('/addLead', validate(leadValidation), responseHandler(controller.createLead));
router.get('/getAllLeads' , responseHandler(controller.generateLead));
router.post('/changeleadStatus/:leadId' , responseHandler(controller.changeLeadStatus));
router.post('/lead-bulk-upload', upload.single('file'), uploadFile, responseHandler(controller.bulkUploadLeads));
router.get('/stage-status-structure' , responseHandler(controller.getStageStatusStructure));


module.exports = router;

