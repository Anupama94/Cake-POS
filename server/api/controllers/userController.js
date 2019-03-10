const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const ErrorConstants = require('../errorConstants');
const UserService = require('../services/userService');


exports.usersLogin = (req, res, next) => {
    const email = req.body.email;
    UserService.getUser({email: email})
        .then(user => {
            if (user.length < 1) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    message: ErrorConstants.AUTH_FAILED.MESSAGE,
                    code: ErrorConstants.AUTH_FAILED.CODE
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(HttpStatus.UNAUTHORIZED).json({
                        message: ErrorConstants.AUTH_FAILED.MESSAGE,
                        code: ErrorConstants.AUTH_FAILED.CODE

                    });
                }
                if (result) {
                    console.log(result)
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "24h"
                        }

                    );
                    return res.status(HttpStatus.OK).json({
                        id: user[0]._id,
                        message: "Auth successful",
                        token: token
                    })
                }
                res.status(HttpStatus.UNAUTHORIZED).json({
                    message: ErrorConstants.AUTH_FAILED.MESSAGE,
                    code: ErrorConstants.AUTH_FAILED.CODE
                });
            })
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
}



/*
    Required only for Testing. Remove!

 */

// exports.usersRegisterUser = (req, res, next) => {
//     // Ensure that two accounts are not made under the same email
//     UserService.registerUser({ email: req.body.email })
//         .then(user => {
//             if (user.length >= 1) {
//                 return res.status(409).json({   // ststus=409 conflict of resources
//                     message: "Mail exists"
//                 });
//             }
//             else {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     if (err) {
//                         return res.status(500).json({
//                             error: err
//                         });
//                     }
//                     else {
//                         const user = new User({
//                             _id: mongoose.Types.ObjectId(),
//                             username: req.body.username,
//                             email: req.body.email,
//                             password: hash
//                         });
//                         user.save()
//                             .then(result => {
//                                 console.log(result);
//                                 res.status(201).json({
//
//                                     //TODO success true
//                                     message: "User created"
//                                 });
//                             })
//                             .catch(err => {
//                                 console.log(err);
//                                 res.status(500).json({
//                                     error: err
//                                 })
//                             });
//                     }
//                 });
//             }
//         })
//         .catch();
// }



exports.usersDeleteUser = (req, res, next) => {
    UserService.deleteUser({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}


exports.usersGetUser = (req, res, next) => {
    UserService.getAllUsers()
        .then(docs => {
            res.status(200).json(docs);

        })
        .catch(err => {;
            res.status(500).json({
                error: err
            });
        });
}

