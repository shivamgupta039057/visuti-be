const express = require("express");
const router = express.Router();
const controller = require("../controllers/leadFieldControllers.js");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const { leadFieldValidation } = require("../../validators/app/leadVal.js");
const upload = require('../../helper/multer');
const { uploadFile } = require("../../helper/fileUploader");

router.post('/addLeadfield', validate(leadFieldValidation), responseHandler(controller.createLeadFieldController));
router.get('/getfieldlist', responseHandler(controller.getLeadFieldsController));
router.post('/updatefieldlist/:leadId', responseHandler(controller.updateLeadFieldController));
router.post('/deletefieldlist/:id', responseHandler(controller.deleteLeadFieldController));
router.get('/reorderfieldlist', responseHandler(controller.reorderLeadFieldController));


module.exports = router;

