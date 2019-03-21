const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const ErrorConstants = require('../errorConstants');
const UserService = require('../services/userService');
const User = require('../models/user');


exports.usersLogin = (req, res) => {
    const email = req.body.email;
    UserService.getUser({ email })
        .then((user) => {
            if (user.length < 1) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    message: ErrorConstants.AUTH_FAILED.MESSAGE,
                    code: ErrorConstants.AUTH_FAILED.CODE
                });
            }
            return bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(HttpStatus.UNAUTHORIZED).json({
                        message: ErrorConstants.AUTH_FAILED.MESSAGE,
                        code: ErrorConstants.AUTH_FAILED.CODE

                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '24h'
                    });

                    return res.status(HttpStatus.OK).json({
                        id: user[0]._id,
                        message: 'Auth successful',
                        token
                    });
                }
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    message: ErrorConstants.AUTH_FAILED.MESSAGE,
                    code: ErrorConstants.AUTH_FAILED.CODE
                });
            });
        })
        .catch((err) => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
};

/*
    Required only for Testing. Remove!

 */

exports.usersRegisterUser = (req, res) => {
    // Ensure that two accounts are not made under the same email
    UserService.checkUserExists({ email: req.body.email })
        .then((user) => {
            if (user.length >= 1) {
                return res.status(HttpStatus.CONFLICT).json({ // status=409 conflict of resources
                    message: 'Mail exists'
                });
            }
            return bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: err
                    });
                }

                return UserService.registerUser(req, hash)
                    .then((result) => {
                        return res.status(HttpStatus.CREATED).json({
                            message: 'User created',
                            data: result
                        });
                    })
                    .catch((error) => {
                        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error
                        });
                    });
            });
        })
        .catch((err) => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
};


exports.usersDeleteUser = (req, res) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then((result) => {
            res.status(HttpStatus.OK).json({
                message: 'User deleted',
                data: result
            });
        })
        .catch((err) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
};


exports.usersGetUser = (req, res) => {
    UserService.getAllUsers()
        .then((docs) => {
            res.status(HttpStatus.OK).json(docs);
        })
        .catch((err) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
};
