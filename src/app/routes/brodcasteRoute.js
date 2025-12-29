const express = require("express");
const router = express.Router();
const controller = require("../controllers/brodcasteController")
const responseHandler = require("../../helper/responseHandler");



router.post("/createBrodcaste", responseHandler(controller.createBrodcaste));
router.post("/:id/start", responseHandler(controller.startBroadcast));


module.exports = router;