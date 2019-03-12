const mongoose = require('mongoose');
require('../db/connect');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


module.exports = mongoose.model('User', userSchema);
