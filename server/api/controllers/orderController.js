const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const log4js = require('log4js');
const OrderService = require('../services/orderService');
const Order = require('../models/order');
const ErrorConstants = require('../errorConstants');

const logger = log4js.getLogger('app');


exports.ordersGetAll = (req, res) => {
    OrderService.getAllOrders()
        .then((docs) => {
            if (docs.success && docs.data) {
                logger.info('all orders successfully received in order.js');
                res.status(HttpStatus.OK).json(docs.data);
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: ErrorConstants.ORDERS_NOT_FOUND.MESSAGE,
                    code: ErrorConstants.ORDERS_NOT_FOUND.CODE
                });
            }
        })
        .catch((err) => {
            logger.error('error occurred while retriving order for the order id ${id}', err, 'order.js');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: ErrorConstants.SERVER_ERROR.MESSAGE,
                code: ErrorConstants.SERVER_ERROR.CODE
            });
        });
};


exports.ordersGetOrder = (req, res) => {
    const id = req.params.orderId;
    OrderService.getOrderById(id)
        .then((doc) => {
            if (doc.success && doc.data) {
                logger.info('order by the given id successfully received');
                res.status(HttpStatus.OK).json(doc.data);
            } else {
                logger.error('order by the given id not found');
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: ErrorConstants.ORDER_UNAVAILABLE.MESSAGE,
                    code: ErrorConstants.ORDER_UNAVAILABLE.CODE
                });
            }
        })
        .catch((err) => {
            logger.error('error occurred while retriving order for the item id ${id}', err, 'order.js');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: ErrorConstants.SERVER_ERROR.MESSAGE,
                code: ErrorConstants.SERVER_ERROR.CODE
            });
        });
};


exports.ordersUpdateOrder = (req, res) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key];
    }
    OrderService.updateOrder(id, updateOps)
        .then((result) => {
            if (result.success && result.data) {
                logger.info('order {$id} successfully updated');
                res.status(HttpStatus.OK).json(result);
            }
        })
        .catch((err) => {
            logger.error('error occurred while updating the order for the order id ${id}', err, 'order.js');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
};


exports.ordersGetByUserId = (req, res) => {
    const userId = req.params.userId;
    OrderService.getOrdersByCreator(userId)
        .then((docs) => {
            if (docs.success && docs.data) {
                logger.info('orders of user {$userId } successfully retrieved');
                res.status(HttpStatus.OK).json(docs.data);
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: ErrorConstants.ORDERS_NOT_FOUND.MESSAGE,
                    code: ErrorConstants.ORDERS_NOT_FOUND.CODE
                });
            }
        })
        .catch((err) => {
            logger.error('error occurred while retriving order for the order of the given user_id ${id}', err, 'order.js');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: ErrorConstants.SERVER_ERROR.MESSAGE,
                code: ErrorConstants.SERVER_ERROR.CODE
            });
        });
};


/*
    Required only for Testing.
        Remove!
        */
exports.ordersCreateOrder = (req, res) => {
    const orderItems = [];
    const userId = req.params.userId;
    for (const ops of req.body.items) {
        const updateOps = { product: ops.product, quantity: ops.quantity };
        orderItems.push(updateOps);
    }

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        items: orderItems,
        status: 'open',
        customer: req.body.customer,
        totalPrice: req.body.totalPrice,
        creator: userId,
        time: Date.now()
    });
    order.save()
        .then((result) => {
            res.status(HttpStatus.CREATED).json(result);
        })
        .catch((err) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
};


exports.orderDeleteOrder = (req, res) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then((result) => {
            res.status(HttpStatus.OK).json(result);
        })
        .catch((err) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
        });
};
