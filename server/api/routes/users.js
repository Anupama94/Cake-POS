const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/user');
const UsersController = require('../controllers/users');


router.post('/login', UsersController.usersLogin);


/* Created only for testing 
    Remove it !
                */
//router.post('/register', UsersController.usersRegisterUser);


/* Created only for testing 
    Remove it !
                */
router.delete('/:userId', UsersController.usersDeleteUser);


/* Created only for testing
    Remove it !
                */

router.get('/', UsersController.usersGetUser);


module.exports = router;