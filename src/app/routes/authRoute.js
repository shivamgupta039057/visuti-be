const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const responseHandler = require("../../helper/responseHandler");



router.post("/register", responseHandler(authController.register));
// router.post("/login", responseHandler(authController.login));

