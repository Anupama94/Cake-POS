const proxyquire = require('proxyquire');
const sinon = require('sinon');
const should = require('should');
const HttpStatus = require('http-status-codes');
const request = require('supertest');
const ErrorConstants = require('../api/errorConstants');




describe("Testing API calls for the resource 'order'", function () {
    let sandbox = null;

    afterEach(function () {
        sandbox.restore();

    });

    before(function () {
        sandbox = sinon.sandbox.create();
    });

    it("should return an order for given order id", function (done) {
        let orderServiceMock = {
            getOrderById: function () {
            }
        };

        let mockOrder = sandbox.stub(orderServiceMock, 'getOrderById');

        mockOrder.returns(Promise.resolve({
            success: true,
            data: 'test data'
        }));

        let order = proxyquire('../api/controllers/orders',
            { '../services/orderService': orderServiceMock })
        let orderRoutes = proxyquire('../api/routes/orders',
            { '../controllers/orders': order })

        let app = proxyquire('../app', { './api/routes/orders': orderRoutes });

        request(app).get('/orders/5c63a24d45a37036e8c92cf7')
            .expect(HttpStatus.OK).end((err, res) => {
            should.not.exist(err);
            res.body.should.be.equal('test data');
            done();
        });


    });


    it("should return an error if an order by the given order id is unavailable", function (done) {
        let orderServiceMock = {
            getOrderById: function () {
            }
        };

        let mockOrder = sandbox.stub(orderServiceMock, 'getOrderById');

        mockOrder.returns(Promise.resolve({
            success: true,
            data: null
        }));

        let order = proxyquire('../api/controllers/orders',
            { '../services/orderService': orderServiceMock })
        let orderRoutes = proxyquire('../api/routes/orders',
            { '../controllers/orders': order })

        let app = proxyquire('../app', { './api/routes/orders': orderRoutes });

        request(app).get('/orders/5c63a24d45a37036e8c92cf7')
            .expect(HttpStatus.NOT_FOUND).end((err, res) => {
            should.not.exist(err);
            done();
        });


    });

    it("should return an error if an error was thrown while fetching an order by a given order id is unavailable", function (done) {
        let orderServiceMock = {
            getOrderById: function () {
            }
        };

        let mockOrder = sandbox.stub(orderServiceMock, 'getOrderById');

        mockOrder.returns(Promise.resolve({
            success: false,
            data: {err: {}}
        }));

        let order = proxyquire('../api/controllers/orders',
            { '../services/orderService': orderServiceMock })
        let orderRoutes = proxyquire('../api/routes/orders',
            { '../controllers/orders': order })

        let app = proxyquire('../app', { './api/routes/orders': orderRoutes });

        request(app).get('/orders/5c63a24d45a37036e8c92cf7')
            .expect(HttpStatus.INTERNAL_SERVER_ERROR).end((err, res) => {
            should.exist(err);
            done();
        });


    });



    it("should return all orders in the database", function (done) {
        let orderServiceMock = {
            getAllOrders: function () {
            }
        };
        let mockItem = sandbox.stub(orderServiceMock, 'getAllOrders');

        mockItem.returns(Promise.resolve({
                success: true,
                data: {
                    "count": 2,
                    "orders": [
                        {
                            "id": "5c6a63a291662738474822d7",
                            "items": [
                                {
                                    "quantity": 5,
                                    "id": "5c756d337e474030ee917cea",
                                    "product": {
                                        "id": "5c63a29f45a37036e8c92cfa",
                                        "name": "French-Fries",
                                        "price": 150,
                                        "category": "food"
                                    }
                                },
                                {
                                    "quantity": 1,
                                    "id": "5c756d337e474030ee917ce9",
                                    "product": {
                                        "id": "5c63a2be45a37036e8c92cfb",
                                        "name": "Chicken Burger",
                                        "price": 450,
                                        "category": "food"
                                    }
                                }
                            ],
                            "status": "open",
                            "customer": "Table 6",
                            "creator": "5c6f7e3bc65ba5267af2d27f",
                            "totalPrice": 5300,
                            "time": "2019-02-22T04:44:43.455Z"
                        },
                        {
                            "id": "5c75f730e306193d96b80c56",
                            "items": [
                                {
                                    "quantity": 9,
                                    "_id": "5c75f9c17e41a0420d296235",
                                    "product": {
                                        "_id": "5c63a2c845a37036e8c92cfc",
                                        "name": "Vege Burger",
                                        "price": 400,
                                        "category": "food",
                                        "__v": 0
                                    }
                                }
                            ],
                            "status": "closed",
                            "customer": "Table 6",
                            "creator": "5c62e636694ff510c4f4ed52",
                            "totalPrice": 5150,
                            "time": "2019-02-27T02:54:07.638Z"
                        }
                    ]
                }
            })
        );

        let order = proxyquire('../api/controllers/orders',
            {'../services/orderService': orderServiceMock});
        let orderRoutes = proxyquire('../api/routes/orders',
            {'../controllers/orders': order});

        let app = proxyquire('../app', {'./api/routes/orders': orderRoutes});
        request(app).get('/orders')
            .expect(HttpStatus.OK).end((err, res) => {
            should.not.exist(err);
            res.body.count.should.be.equal(2);
            res.body.orders[0].id.should.be.equal("5c6a63a291662738474822d7");
            res.body.orders[0].items[0].quantity.should.be.equal(5);
            res.body.orders[0].items[0].id.should.be.equal("5c756d337e474030ee917cea");
            res.body.orders[0].items[0].product.id.should.be.equal("5c63a29f45a37036e8c92cfa");
            res.body.orders[0].items[0].product.name.should.be.equal("French-Fries");
            res.body.orders[0].items[0].product.price.should.be.equal(150);
            res.body.orders[0].items[0].product.category.should.be.equal("food");
            res.body.orders[0].status.should.be.equal("open");
            res.body.orders[0].customer.should.be.equal("Table 6");
            res.body.orders[0].creator.should.be.equal("5c6f7e3bc65ba5267af2d27f");
            res.body.orders[0].totalPrice.should.be.equal(5300);
            res.body.orders[0].time.should.be.equal("2019-02-22T04:44:43.455Z");
            done();
        });
    });


    it("should return all orders in the database", function (done) {
        let orderServiceMock = {
            getAllOrders: function () {
            }
        };
        let mockItem = sandbox.stub(orderServiceMock, 'getAllOrders');

        mockItem.returns(Promise.resolve({
            success: false,
            message: ErrorConstants.ORDERS_NOT_FOUND.MESSAGE,
            code: ErrorConstants.ORDERS_NOT_FOUND.CODE
        }));

        let order = proxyquire('../api/controllers/orders',
            {'../services/orderService': orderServiceMock});
        let orderRoutes = proxyquire('../api/routes/orders',
            {'../controllers/orders': order});

        let app = proxyquire('../app', {'./api/routes/orders': orderRoutes});
        request(app).get('/orders')
            .expect(HttpStatus.NOT_FOUND).end((err, res) => {
            should.not.exist(err);
            res.body.success.should.be.equal(false);

            done();
        });
    });


    it("should return all orders created by the requested user in the database", function (done) {
        let orderServiceMock = {
            getOrdersByCreator: function() {
            }
        };
        let mockItem = sandbox.stub(orderServiceMock, 'getOrdersByCreator');

        mockItem.returns(Promise.resolve({
                success: true,
                data: {
                    "count": 2,
                    "orders": [
                        {
                            "id": "5c6a63a291662738474822d7",
                            "items": [
                                {
                                    "quantity": 5,
                                    "id": "5c756d337e474030ee917cea",
                                    "product": {
                                        "id": "5c63a29f45a37036e8c92cfa",
                                        "name": "French-Fries",
                                        "price": 150,
                                        "category": "food"
                                    }
                                },
                                {
                                    "quantity": 1,
                                    "id": "5c756d337e474030ee917ce9",
                                    "product": {
                                        "id": "5c63a2be45a37036e8c92cfb",
                                        "name": "Chicken Burger",
                                        "price": 450,
                                        "category": "food"
                                    }
                                }
                            ],
                            "status": "open",
                            "customer": "Table 6",
                            "creator": "5c6f7e3bc65ba5267af2d27f",
                            "totalPrice": 5300,
                            "time": "2019-02-22T04:44:43.455Z"
                        },
                        {
                            "id": "5c75f730e306193d96b80c56",
                            "items": [
                                {
                                    "quantity": 9,
                                    "_id": "5c75f9c17e41a0420d296235",
                                    "product": {
                                        "_id": "5c63a2c845a37036e8c92cfc",
                                        "name": "Vege Burger",
                                        "price": 400,
                                        "category": "food",
                                        "__v": 0
                                    }
                                }
                            ],
                            "status": "closed",
                            "customer": "Table 6",
                            "creator": "5c6f7e3bc65ba5267af2d27f",
                            "totalPrice": 5150,
                            "time": "2019-02-27T02:54:07.638Z"
                        }
                    ]
                }
            })
        );

        let order = proxyquire('../api/controllers/orders',
            {'../services/orderService': orderServiceMock});
        let orderRoutes = proxyquire('../api/routes/orders',
            {'../controllers/orders': order});

        let app = proxyquire('../app', {'./api/routes/orders': orderRoutes});
        request(app).get('/orders/all/5c6f7e3bc65ba5267af2d27f')
            .expect(HttpStatus.OK).end((err, res) => {
            should.not.exist(err);
            res.body.count.should.be.equal(2);
            res.body.orders[0].id.should.be.equal("5c6a63a291662738474822d7");
            res.body.orders[0].items[0].quantity.should.be.equal(5);
            res.body.orders[0].items[0].id.should.be.equal("5c756d337e474030ee917cea");
            res.body.orders[0].items[0].product.id.should.be.equal("5c63a29f45a37036e8c92cfa");
            res.body.orders[0].items[0].product.name.should.be.equal("French-Fries");
            res.body.orders[0].items[0].product.price.should.be.equal(150);
            res.body.orders[0].items[0].product.category.should.be.equal("food");
            res.body.orders[0].status.should.be.equal("open");
            res.body.orders[0].customer.should.be.equal("Table 6");
            res.body.orders[0].creator.should.be.equal("5c6f7e3bc65ba5267af2d27f");
            res.body.orders[0].totalPrice.should.be.equal(5300);
            res.body.orders[0].time.should.be.equal("2019-02-22T04:44:43.455Z");
            done();
        });
    });


    it("should return an error message if no orders created by the requested user are available in the database", function (done) {
        let orderServiceMock = {
            getOrdersByCreator: function() {
            }
        };
        let mockItem = sandbox.stub(orderServiceMock, 'getOrdersByCreator');

        mockItem.returns(Promise.resolve({
            success: true,
            data: null
        }));

        let order = proxyquire('../api/controllers/orders',
            {'../services/orderService': orderServiceMock});
        let orderRoutes = proxyquire('../api/routes/orders',
            {'../controllers/orders': order});

        let app = proxyquire('../app', {'./api/routes/orders': orderRoutes});
        request(app).get('/orders/all/5c6f7e3bc65ba5267afab27f')
            .expect(HttpStatus.NOT_FOUND).end((err, res) => {
            should.not.exist(err);
            done();
        });
    });




    it("should return a success response if the order specified by the order_id is successfully updated", function (done) {
        let orderServiceMock = {
            updateOrder: function() {
            }
        };
        let mockItem = sandbox.stub(orderServiceMock, 'updateOrder');

        mockItem.returns(Promise.resolve({
            success: true,
            data: "success-data"

        }));

        let order = proxyquire('../api/controllers/orders',
            {'../services/orderService': orderServiceMock});
        let orderRoutes = proxyquire('../api/routes/orders',
            {'../controllers/orders': order});

        let app = proxyquire('../app', {'./api/routes/orders': orderRoutes});
        request(app).put('/orders/5c6a63a291662738474822d7')
            .expect(HttpStatus.OK).end((err, res) => {
            should.not.exist(err);
            res.body.data.should.be.equal("success-data");
            done();
        });
    });







})



