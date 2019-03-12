const express = require('express');
global.config = require('./config/system-config.json');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const orderRoutes = require('./api/routes/orderRoute');
const userRoutes = require('./api/routes/userRoute');
const itemRoutes = require('./api/routes/itemRoute');

const app = express();

app.use(bodyParser.urlencoded(
    { extended: false }
)); // only supports the parsing of simple bodies for urlencoded data
app.use(bodyParser.json()); // will extract json data and make them more readable

// Ensuring that we prevent CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    /* OPTIONS request is sent first by default with POST and PUT requests
        and the browser checks whether its allowed to do so
        */
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'OPTIONS, PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(HttpStatus.OK).json({});
    }
    return next();
});

app.use('/orders', orderRoutes); // each url starting with /orders will be forwarded to ./api/routes/orders file
app.use('/users', userRoutes);
app.use('/items', itemRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = HttpStatus.NOT_FOUND;
    next(error);
});

// This middleware will handle errors from anywhere in the application
app.use((error, req, res) => {
    res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    res.json({
        error: {
            message: [error.message, 'error inititated']
        }
    });
});

module.exports = app;
