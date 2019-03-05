const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ItemController = require('../controllers/items');

router.get('/', ItemController.itemsGetAll);

router.get('/:itemId', ItemController.itemsGetItem);

/*
    Required only for testing. Remove!

    */

router.post('/', ItemController.itemsCreateItem);

router.delete('/:itemId', ItemController.itemsDeleteItem);

router.patch('/:itemId', ItemController.itemsUpdateItem);


module.exports = router;