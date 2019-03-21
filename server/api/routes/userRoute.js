const express = require('express');
// const User = require('../models/user');
const UsersController = require('../controllers/userController');

const router = express.Router();


router.post('/login', UsersController.usersLogin);


/* Created only for testing
    Remove !
                */
router.post('/register', UsersController.usersRegisterUser);

router.delete('/:userId', UsersController.usersDeleteUser);

router.get('/', UsersController.usersGetUser);


module.exports = router;
