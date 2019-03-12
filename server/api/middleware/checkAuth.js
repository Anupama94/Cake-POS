const jwt = require('jsonwebtoken');
const log4js = require('log4js');
const HttpStatus = require('http-status-codes');
const ErrorConstants = require('../errorConstants');

const logger = log4js.getLogger();


exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
    } catch (error) {
        logger.error('unauthorized access caught in checkAuth.js');
        return res.status(HttpStatus.UNAUTHORIZED).json({
            message: ErrorConstants.AUTH_FAILED.MESSAGE,
            code: ErrorConstants.AUTH_FAILED.CODE
        });
    }
    return next();
};
