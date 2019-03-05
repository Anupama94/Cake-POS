const Order = require("../models/order");
const ErrorConstants = require("../errorConstants");
const messages = require("../messages");


exports.getAllOrders = function () {
    return Order.find()
        .populate("items.product")
        .exec()
        .then(returnedOrders => {
            if (!returnedOrders) {
                return messages.success();
            }
            else {
                const response = {
                    count: returnedOrders.length,
                    orders: returnedOrders.map(doc => {
                        return {
                            id: doc._id,
                            items: doc.items,
                            status: doc.status,
                            customer: doc.customer,
                            creator: doc.creator,
                            totalPrice: doc.totalPrice,
                            time: doc.time
                        }
                    })
                };
                return messages.success(response);
            }
        })
        .catch(err => {
            logger.error("Database error")
            return messages.error(err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE) ;
        });
}


exports.getOrderById = function (id) {
    return Order.findById(id)
        .populate('items.product')
        .exec()
        .then(returnedOrder => {
            if (!returnedOrder) {
                return messages.success();
            }
            else {
                return messages.success(returnedOrder);
            }
        })
        .catch(err => {
            logger.error("error initiated in the Database");
            return messages.error(err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE)
        });
}


exports.updateOrder = function (id, updateOps) {
    return Order.update({ _id: id }, { $set: updateOps })
        .exec()
        .then((updatedObject) => {
            return messages.success(updatedObject);
        })
        .catch(err => {
            logger.error("error initiated in the Database");
            return messages.error(err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE)
        });

}


exports.getOrdersByCreator = function (userId) {
    let query = { creator: userId };
    return Order.find(query)
        .populate("items.product")
        .exec()
        .then(returnedOrders => {
            if (returnedOrders < 1) {
                return messages.success();
            }
            else {
                return messages.success(returnedOrders);
            }
        })
        .catch(err => { 
            return messages.error(err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE) 
        });
}




