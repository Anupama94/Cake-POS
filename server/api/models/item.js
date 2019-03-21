const mongoose = require('mongoose');
require('../db/connect');

const itemSchema = mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
});


module.exports = mongoose.model('Item', itemSchema);
