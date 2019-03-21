const log4js = require('log4js');

const logger = log4js.getLogger('app');

exports.validateItemCreation = (req) => {
    const pricePattern = /^(\d{1,3})?(,?\d{3})*(\.\d{2})?$/;

    if (req.body.name.length < 1 || req.body.name.length > 25) {
        logger.error('Item name not a string less than 25 characters, validated in validateItem.js');
    }
    if (!pricePattern.test(req.body.price)) {
        logger.error('invalid item price validated in validateItem.js');
    }
    if (req.body.name && req.body.price && req.body.category) {
        return true;
    }
    return false;
};
