const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const itemRoutes = require('./api/routes/items');

mongoose.connect("mongodb://anupama:"
   + process.env.MONGO_ATLAS_PW + 
  "@cluster0-shard-00-00-h9bxn.mongodb.net:27017,cluster0-shard-00-01-h9bxn.mongodb.net:27017,cluster0-shard-00-02-h9bxn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
  {
    useMongoClient: true
  }, function(err, db) {
    // handle database failure error
  }
);
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false})); //only supports the parsing of simple bodies for urlencoded data
app.use(bodyParser.json()); // will extract json data and make them more readable

// Ensuring that we prevent CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

  //OPTIONS request is sent first by default with POST and PUT requests and the browser checks whether its allowed to do so
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods', 
      'OPTIONS, PUT, POST, PATCH, DELETE, GET'
      );
    return res.status(HttpStatus.OK).json({});
  }
  next();
});

app.use('/orders', orderRoutes);  // each url starting with /orders will be forwarded to ./api/routes/orders file
app.use('/users', userRoutes);
app.use('/items', itemRoutes);


app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = HttpStatus.NOT_FOUND;
  next(error);
})

// This middleware will handle errors from anywhere in the application
app.use((error, req, res, next) => {
  res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    error: {
      message: [error.message, 'error inititated']
    }
  });
});

module.exports = app;
