const express = require('express');
const CheckAuth = require('../middleware/checkAuth');
const ItemController = require('../controllers/itemController');

const router = express.Router();

router.get('/', CheckAuth.authenticate, ItemController.itemsGetAll);

router.get('/:itemId', CheckAuth.authenticate, ItemController.itemsGetItem);

/*
    Required only for testing. Remove!

    */

router.post('/', ItemController.itemsCreateItem);

router.delete('/:itemId', ItemController.itemsDeleteItem);

router.patch('/:itemId', ItemController.itemsUpdateItem);


module.exports = router;
