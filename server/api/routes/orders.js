const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const OrderController = require('../controllers/orders');

router.get('/', OrderController.ordersGetAll);

router.get('/:orderId', OrderController.ordersGetOrder);

router.get('/all/:userId', OrderController.ordersGetByUserId);
    
router.put('/:orderId', OrderController.ordersUpdateOrder);

/*
    Required only for Testing.
        Remove!
*/

router.post('/:userId', OrderController.ordersCreateOrder);

router.delete('/:orderId', OrderController.orderDeleteOrder);


module.exports = router;