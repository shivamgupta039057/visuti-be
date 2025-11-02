const express = require("express");
const router = express.Router();
const controllers = require("../controllers/permissionController");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const auth = require("../../middleware/auth");

// Get Homepage Data
router.get('/getPermissionTemplates' , responseHandler(controllers.getPermssionTemplate ));



module.exports = router;