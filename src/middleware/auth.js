const jwt = require('jsonwebtoken');
const studentModel = require('../models/StudentModel');
const config = require('../config/dev.config');

module.exports = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ').pop();
            const { _id } = jwt.verify(token, config.SECRET);
            console.log('token:', token);
            console.log('userId:', _id);
            req.user = await studentModel.findOne({ _id, isDeleted: false })
            if (req.user?.isBlocked) {
                return res.status(401).json({
                    success: false,
                    message: 'Your Account is Blocked...!'
                });
            }
            if (req.user && ((req.user.isRegister && req.user.isDocAdd) || ["/set-self-profile", "/profile", "/SignStampUpload"].includes(req.url))) {
                return next();
            }
            else {
                console.log('req.url:', req.url);
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                    data: []
                });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: 'Token Not Found',
                data: []
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: 'Invalid Token',
            data: []
        });
    }
};