const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
    global.config.mongodb.connectionString,
    { useCreateIndex: true, useNewUrlParser: true }
);

module.exports = mongoose.connection;
