const log4js = require('log4js');

const logger = log4js.getLogger('app');

exports.validateItemCreation = (req) => {
    const pricePattern = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    let validatedPrice = true;

    if (req.body.name.length < 1 || req.body.name.length > 25) {
        logger.error('Item name provided is not a string less than 25 characters, validated in validateItem.js');
    }
    if (!pricePattern.test(req.body.price)) {
        logger.error('invalid item price, validated in validateItem.js');
        validatedPrice = false;
    }
    if (req.body.name && validatedPrice && req.body.category) {
        return true;
    }
    return false;
};
