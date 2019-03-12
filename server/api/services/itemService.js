const log4js = require('log4js');
const Item = require('../models/item');
const messages = require('../messages');
const ErrorConstants = require('../errorConstants');


const logger = log4js.getLogger();

exports.getItemById = function (id) {
    return Item.findById(id)
        .exec()
        .then((returnedItem) => {
            if (!returnedItem) {
                logger.info('data successfully received from the database');
                return messages.success();
            }
            logger.info('data successfully received from the database');
            return messages.success(returnedItem, 'Data Available');
        })
        .catch((err) => {
            logger.error('Error initiated within the database');
            return messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};

exports.getAllItems = function () {
    return Item.find()
        .select('id name price category')
        .exec()
        .then((returnedItems) => {
            if (!returnedItems) {
                return messages.success();
            }
            const response = {
                count: returnedItems.length,
                items: returnedItems.map((doc) => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        category: doc.category
                    };
                })
            };

            return messages.success(response);
        })
        .catch((err) => {
            messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};
