const express = require('express');
const router = express.Router();
const CheckAuth = require('../middleware/checkAuth');
const ItemController = require('../controllers/itemController');

router.get('/', CheckAuth.authenticate, ItemController.itemsGetAll);

router.get('/:itemId', CheckAuth.authenticate, ItemController.itemsGetItem);

/*
    Required only for testing. Remove!

    */

router.post('/', ItemController.itemsCreateItem);

router.delete('/:itemId', ItemController.itemsDeleteItem);

router.patch('/:itemId', ItemController.itemsUpdateItem);


module.exports = router;