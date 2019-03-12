const mongoose = require('mongoose');
require('../db/connect');

const itemSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
});


module.exports = mongoose.model('Item', itemSchema);
