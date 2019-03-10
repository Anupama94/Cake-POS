const mongoose = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;

const connection = mongoose.connect(global.config.mongodb.connectionString);
//autoIncrement.initialize(connection);

module.exports = mongoose.connection;