const mongoose = require('mongoose');
require('../db/connect');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        quantity: { type: Number, default: 1 }
    }],
    customer: { type: String, required: true },
    status: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: Date },
    totalPrice: { type: Number }

});


module.exports = mongoose.model('Order', orderSchema);
