const log4js = require('log4js');
const Order = require('../models/order');
const ErrorConstants = require('../errorConstants');
const messages = require('../messages');

const logger = log4js.getLogger();


exports.getAllOrders = () => {
    return Order.find()
        .populate('items.product')
        .exec()
        .then((returnedOrders) => {
            if (!returnedOrders) {
                return messages.success();
            }
            const response = {
                count: returnedOrders.length,
                orders: returnedOrders.map((doc) => {
                    return {
                        id: doc._id,
                        items: doc.items,
                        status: doc.status,
                        customer: doc.customer,
                        creator: doc.creator,
                        totalPrice: doc.totalPrice,
                        time: doc.time
                    };
                })
            };
            return messages.success(response);
        })
        .catch((err) => {
            logger.error('Database error, orderService.js');
            return messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};


exports.getOrderById = (id) => {
    return Order.findById(id)
        .populate('items.product')
        .exec()
        .then((returnedOrder) => {
            if (!returnedOrder) {
                return messages.success();
            }
            return messages.success(returnedOrder);
        })
        .catch((err) => {
            logger.error('error initiated in the Database, orderService.js');
            return messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};


exports.updateOrder = (id, updateOps) => {
    return Order.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then((updatedObject) => {
            return messages.success(updatedObject);
        })
        .catch((err) => {
            logger.error('error initiated in the Database, orderService.js');
            return messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};


exports.getOrdersByCreator = function (userId) {
    const query = { creator: userId };
    return Order.find(query)
        .populate('items.product')
        .exec()
        .then((returnedOrders) => {
            if (returnedOrders < 1) {
                return messages.success();
            }
            return messages.success(returnedOrders);
        })
        .catch((err) => {
            logger.error('error initiated in the Database, orderService.js');
            return messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};
