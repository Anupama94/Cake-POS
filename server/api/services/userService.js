const User = require("../models/user");
const messages = require("../messages");
const ErrorConstants = require('../errorConstants');
const log4js = require('log4js');
const logger = log4js.getLogger();
const mongoose = require('mongoose');




exports.getUser = function(email) {
    return User.find(email)
        .exec()
        .then(returnedUser => {
            console.log(returnedUser);
            return returnedUser
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
}


exports.registerUser = function(data) {
    return User.find(data)
        .exec()
        .then(returnedUser => {
            return returnedUser
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
}


exports.deleteUser = function(data) {
    return User.remove(data)
        .exec()
        .then(returnedUser => {
            return returnedUser
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
}


exports.getAllUsers = function() {
    return User.find()
        .exec()
        .then(returnedUser => {
            return returnedUser
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
}





