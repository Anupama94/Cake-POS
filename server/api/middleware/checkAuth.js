const jwt = require('jsonwebtoken');
const ErrorConstants = require('../errorConstants');
const log4js = require('log4js');
const logger = log4js.getLogger();
const HttpStatus = require('http-status-codes');

exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
    }
    catch (error) {
        logger.error("unauthorized access caught in checkAuth.js");
        return res.status(HttpStatus.UNAUTHORIZED).json({
            message: ErrorConstants.AUTH_FAILED.MESSAGE,
            code: ErrorConstants.AUTH_FAILED.CODE
        });
    }
    next();
};