const express = require("express");
const router = express.Router();
const controller = require("../controllers/leadStageController.js");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const { leadStageValidation, leadStatusValidation, leadReasonValidation } = require("../../validators/app/leadVal.js");
const upload = require('../../helper/multer');
const { uploadFile } = require("../../helper/fileUploader");


// lead stage routes

router.get('/getfieldstage', responseHandler(controller.getAllLeadStagesController));
router.get('/getfieldstage/:id', responseHandler(controller.getLeadStageByIdController));
router.post('/addLeadstage', validate(leadStageValidation), responseHandler(controller.createLeadStageController));
router.post('/updatefieldstage/:id', responseHandler(controller.updateLeadStageController));
router.post('/deletefieldstage/:id', responseHandler(controller.deleteLeadStageController));


// lead status routes
router.post('/addLeadstatus', validate(leadStatusValidation), responseHandler(controller.createLeadStatusController));
router.get('/getallstage', responseHandler(controller.getAllLeadStatusesController));
router.post('/updateLeadstatus/:id', responseHandler(controller.updateLeadStatusController));
router.post('/deleteLeadstatus/:id', responseHandler(controller.deleteLeadStatusController));

// lead reason routes

router.post('/addLeadreason', validate(leadReasonValidation), responseHandler(controller.createLeadReasonController));
router.get('/getallreason', responseHandler(controller.getAllLeadReasonsController));
router.post('/updateLeadreason/:id', responseHandler(controller.updateLeadReasonController));
router.post('/deleteLeadreason/:id', responseHandler(controller.deleteLeadReasonController));

// full lead with stage,status,reason

router.get('/getfullLeads', responseHandler(controller.getfullLeadsController));


module.exports = router;

