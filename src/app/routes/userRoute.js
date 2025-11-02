const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userController");
const responseHandler = require("../../helper/responseHandler");
const validate = require("../../helper/validate");
const auth = require("../../middleware/auth");
const {addUserVal } = require("../../validators/app/userVal");
// Get Homepage Data

router.post('/addUser' ,validate(addUserVal), responseHandler(controllers.addUser ));
router.get('/getUser',responseHandler(controllers.getUserList))
router.post('/editUser/:id',responseHandler(controllers.editUser))
router.post('/login',responseHandler(controllers.login))

module.exports = router;