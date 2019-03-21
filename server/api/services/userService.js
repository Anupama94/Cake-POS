const log4js = require('log4js');
const User = require('../models/user');
const messages = require('../messages');
const ErrorConstants = require('../errorConstants');

const logger = log4js.getLogger();

exports.getUser = (email) => {
    return User.find(email)
        .exec()
        .then((returnedUser) => {
            return returnedUser;
        })
        .catch((err) => {
            logger.error('error initiated in the Database, userService.js');
            return messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};


exports.checkUserExists = (data) => {
    return User.find(data)
        .exec()
        .then((returnedUser) => {
            return returnedUser;
        })
        .catch((err) => {
            logger.error('error initiated in the Database, userService.js');
            return messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};


// exports.registerUser = (req, hash) => {
//     const user = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: hash
//     });
//     return user.save()
//         .then((result) => {
//             return result;
//         })
//         .catch((err) => {
//             logger.error('error initiated in the Database, userService.js');
//             return messages.error(
//                 err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
//             );
//         });
// };


exports.deleteUser = (data) => {
    return User.remove(data)
        .exec()
        .then((returnedUser) => {
            return returnedUser;
        })
        .catch((err) => {
            logger.error('error initiated in the Database, userService.js');
            return messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};


exports.getAllUsers = () => {
    return User.find()
        .exec()
        .then((returnedUser) => {
            return returnedUser;
        })
        .catch((err) => {
            logger.error('error initiated in the Database, userService.js');
            return messages.error(
                err, ErrorConstants.DATABASE_ERROR.MESSAGE, ErrorConstants.DATABASE_ERROR.CODE
            );
        });
};
