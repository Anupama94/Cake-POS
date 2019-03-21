const log4js = require('log4js');

const logger = log4js.getLogger('app');

exports.validateOrderCreation = (request) => {
    const objectId = /^[0-9a-fA-F]{24}$/;
    const pricePattern = /^(\d{1,3})?(,?\d{3})*(\.\d{2})?$/;

    if (request.items === 0) {
        logger.error('An order must have atleast one item');
        return false;
    }
    if (request.customer === 0) {
        logger.error('An order must have a customer');
        return false;
    }
    if (!objectId.test(request.creator)) {
        logger.error('An order must have a valid customer');
        return false;
    }
    if (!pricePattern.test(request.totalPrice)) {
        logger.error('An order must have a total price');
        return false;
    }
    return true;
};
