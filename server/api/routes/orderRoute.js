const express = require('express');
const CheckAuth = require('../middleware/checkAuth');
const OrderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', CheckAuth.authenticate, OrderController.ordersGetAll);

router.get('/:orderId', CheckAuth.authenticate, OrderController.ordersGetOrder);

router.get('/all/:userId', CheckAuth.authenticate, OrderController.ordersGetByUserId);

router.put('/:orderId', OrderController.ordersUpdateOrder);

/*
    Required only for Testing.
        Remove!
*/

router.post('/:userId', OrderController.ordersCreateOrder);

router.delete('/:orderId', OrderController.orderDeleteOrder);


module.exports = router;