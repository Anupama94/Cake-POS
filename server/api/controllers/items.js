const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const Item = require("../models/item");
const itemService = require('../services/itemService');
const ErrorConstants = require('../errorConstants');
const log4js = require('log4js');
const logger = log4js.getLogger();


exports.itemsGetAll = (req, res, next) => {
    itemService.getAllItems()
        .then(result => {
            if (result.success && result.data) {
                
                logger.info("items successfully received");
                res.status(HttpStatus.OK).json(result.data);


            }

            else {
                logger.info("no items found");
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: ErrorConstants.ITEMS_NOT_FOUND.MESSAGE,
                    code: ErrorConstants.ITEMS_NOT_FOUND.CODE
                });
            }
        })
        .catch(err => {
            logger.error("error occurred while retriving item for the item id ${id}", err, "item.js");
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: ErrorConstants.SERVER_ERROR.MESSAGE,
                code: ErrorConstants.SERVER_ERROR.CODE
            });
        })
}


exports.itemsGetItem = (req, res, next) => {
    const id = req.params.itemId;

    itemService.getItemById(id)
        .then(result => {
            
            if (result.success && result.data) {
                logger.info("item by the given id successfully received");
                res.status(HttpStatus.OK).json(result.data);


            }
            else {
                logger.error("item by the given id not found");
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: ErrorConstants.ITEM_UNAVAILABLE.MESSAGE,
                    code: ErrorConstants.ITEM_UNAVAILABLE.CODE
                });
            }

        })
        .catch(err => {
            logger.error("error occurred while retriving item for the item id ${id}", err, "item.js");
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: ErrorConstants.SERVER_ERROR.MESSAGE,
                code: ErrorConstants.SERVER_ERROR.CODE
            });
        });
}


/*

    Created Only for Testing. Remove!
    
    */


exports.itemsCreateItem = (req, res, next) => {
    const item = new Item({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });

    item.save().
        then(result => {
            console.log(result);
            res.status(201).json({
                message: "Succefully created a new item",
                createdItem: item
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.itemsDeleteItem = (req, res, next) => {
    const id = req.params.itemId;
    Item.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}


exports.itemsUpdateItem = (req, res, next) => {
    const id = req.params.itemId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Item.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}