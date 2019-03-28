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


exports.getOrdersByCreator = (userId) => {
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


// exports.createOrder = (req) => {
//     const orderItems = [];
//     const userId = req.params.userId;
//     for (const ops of req.body.items) {
//         const updateOps = { product: ops.product, quantity: ops.quantity };
//         orderItems.push(updateOps);
//     }

//     const order = new Order({
//         items: orderItems,
//         status: 'open',
//         customer: req.body.customer,
//         totalPrice: req.body.totalPrice,
//         creator: userId,
//         time: Date.now()
//     });

//     return order.save()
//         .then(() => {
//             return messages.success(order);
//         })
//         .catch((err) => {
//             return err;
//         });
// };
