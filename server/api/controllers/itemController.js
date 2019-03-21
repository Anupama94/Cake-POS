const HttpStatus = require('http-status-codes');
const log4js = require('log4js');
const itemService = require('../services/itemService');
const ErrorConstants = require('../errorConstants');
const validateItemService = require('../validation/validateItem');

const logger = log4js.getLogger('app');


exports.itemsGetAll = (req, res) => {
    itemService.getAllItems()
        .then((result) => {
            if (result.success && result.data) {
                logger.info('items successfully received');
                res.status(HttpStatus.OK).json(result.data);
            } else {
                logger.info('no items found');
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: ErrorConstants.ITEMS_NOT_FOUND.MESSAGE,
                    code: ErrorConstants.ITEMS_NOT_FOUND.CODE
                });
            }
        })
        .catch((err) => {
            logger.error('error occurred while retriving all items', err, 'itemController.js');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: ErrorConstants.SERVER_ERROR.MESSAGE,
                code: ErrorConstants.SERVER_ERROR.CODE
            });
        });
};


exports.itemsGetItem = (req, res) => {
    const id = req.params.itemId;

    itemService.getItemById(id)
        .then((result) => {
            if (result.success && result.data) {
                logger.info('item by the given id successfully received, itemController.js');
                res.status(HttpStatus.OK).json(result.data);
            } else {
                logger.error('item by the given id not found');
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: ErrorConstants.ITEM_UNAVAILABLE.MESSAGE,
                    code: ErrorConstants.ITEM_UNAVAILABLE.CODE
                });
            }
        })
        .catch((err) => {
            logger.error(`error occurred while retriving item for the item id ${id}`, err, 'item.js');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: ErrorConstants.SERVER_ERROR.MESSAGE,
                code: ErrorConstants.SERVER_ERROR.CODE
            });
        });
};


/*
    Created Only for Testing. Remove!
*/


exports.itemsCreateItem = (req, res) => {
    if (validateItemService.validateItemCreation(req)) {
        itemService.createItem(req)
            .then((result) => {
                if (result.success) {
                    res.status(HttpStatus.CREATED).json({
                        message: 'Successfully created a new item',
                        createdItem: result.data
                    });
                }
            })
            .catch((err) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: err
                });
            });
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Inavlid parameters'
        });
    }
};


exports.itemsDeleteItem = (req, res) => {
    const id = req.params.itemId;
    itemService.deleteItem({ _id: id })
        .then((result) => {
            if (result.success && result.data.deletedCount === 1) {
                res.status(HttpStatus.OK).json(result);
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: ErrorConstants.ITEM_UNAVAILABLE.MESSAGE,
                    code: ErrorConstants.ITEM_UNAVAILABLE.CODE
                });
            }
        })
        .catch((err) => {
            logger.error(`error occurred while deleting item for the item id ${id}`, err, 'item.js');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
        });
};


exports.itemsUpdateItem = (req, res) => {
    itemService.updateItem(req)
        .then((result) => {
            res.status(HttpStatus.OK).json(result);
        })
        .catch((err) => {
            logger.error('error occurred while updating item', err, 'item.js');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
        });
};
