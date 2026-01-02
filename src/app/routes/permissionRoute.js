const express = require("express");
const router = express.Router();
const controllers = require("../controllers/permissionController");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const auth = require("../../middleware/auth");

// Get Homepage Data

router.get('/getPermissionTemplates', auth, responseHandler(controllers.getPermssionTemplate));
router.get('/getTemplatesName', auth, responseHandler(controllers.getTemplatesName));
router.post('/createPermissionTemplate', auth, responseHandler(controllers.createPermissionTemplate));
router.post('/updatePermissionTemplate/:id', auth, responseHandler(controllers.updatePermissionTemplate));

module.exports = router;