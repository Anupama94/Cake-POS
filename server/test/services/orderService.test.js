const proxyquire = require('proxyquire');
const sinon = require('sinon');
const should = require('should');
const ErrorConstants = require('../../api/errorConstants');


describe('orderService test suite', () => {
    let globalConfigMock;

    beforeEach(() => {
        globalConfigMock = Object.assign({}, global.config);
        global.config = {
            mongodb: { connectionString: '' }
        };
    });

    afterEach(() => {
        global.config = globalConfigMock;
    });

    describe('orderService getOrderById test suite', () => {
        it('should return the item given the item id', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                findById: () => {
                }
            };

            const populateMock = {
                populate: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const orderDataMock = {
                items: [
                    {
                        quantity: 5,
                        _id: '5c756d337e474030ee917cea',
                        product: {
                            _id: '5c63a29f45a37036e8c92cfa',
                            name: 'French-Fries',
                            price: 150,
                            category: 'food',
                            __v: 0
                        }
                    },
                    {
                        quantity: 1,
                        _id: '5c756d337e474030ee917ce9',
                        product: {
                            _id: '5c63a2be45a37036e8c92cfb',
                            name: 'Chicken Burger',
                            price: 450,
                            category: 'food',
                            __v: 0
                        }
                    },
                    {
                        quantity: 1,
                        _id: '5c756d337e474030ee917ce8',
                        product: {
                            _id: '5c6658d3fce0b91f0c96a5c9',
                            name: 'Banana Cream Pie',
                            price: 300,
                            category: 'food',
                            __v: 0
                        }
                    },
                    {
                        quantity: 1,
                        _id: '5c756d337e474030ee917ce7',
                        product: {
                            _id: '5c63a27345a37036e8c92cf9',
                            name: 'Water Bottle',
                            price: 150,
                            category: 'beverage',
                            __v: 0
                        }
                    }
                ],
                status: 'open',
                customer: 'Table 5',
                creator: '5c6a63a291662738474822d8',
                totalPrice: 2180,
                time: '2019-02-18T07:49:54.399Z'
            };

            const queryStub = sinon.stub(queryMock, 'findById');
            const populateStub = sinon.stub(populateMock, 'populate');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(populateMock);

            populateStub.returns(execMock);

            execStub.resolves(orderDataMock);

            messageStub.returns({
                success: true,
                data: orderDataMock
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getOrderById('123').then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                result.data.status.should.be.equal('open');
                done();
            }).catch(done.fail);
        });


        it('should return a null object if an object by the given id is not available', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                findById: () => {
                }
            };

            const populateMock = {
                populate: () => {

                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'findById');
            const populateStub = sinon.stub(populateMock, 'populate');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(populateMock);

            populateStub.returns(execMock);

            execStub.resolves(null);

            messageStub.returns({
                success: true,
                data: null
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getOrderById('invalid-id').then((result, err) => {
                should.not.exists(err);
                should.exists(result);
                result.success.should.be.equal(true);
                done();
            }).catch(done.fail);
        });


        it('should return throw an error when an error occurs while executing the query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                findById: () => {
                }
            };

            const populateMock = {
                populate: () => {

                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'findById');
            const populateStub = sinon.stub(populateMock, 'populate');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(populateMock);

            populateStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.getOrderById('123').then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                err.message.should.be.equal(ErrorConstants.DATABASE_ERROR.MESSAGE);
                err.code.should.be.equal(ErrorConstants.DATABASE_ERROR.CODE);
                done();
            }).catch(done.fail);
        });
    });


    describe('orderService getAllOrders test suite', () => {
        it('should return all orders successfully', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const populateMock = {
                populate: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const populateStub = sinon.stub(populateMock, 'populate');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(populateMock);

            populateStub.returns(execMock);

            execStub.resolves([{
                name: 'Water Bottle',
                price: 150,
                _id: '5c63a27345a37036e8c92cf9',
                category: 'beverage'
            }]);

            messageStub.returns({
                success: true,
                data: [{
                    name: 'Water Bottle',
                    price: 150,
                    _id: '5c63a27345a37036e8c92cf9',
                    category: 'beverage'
                }]
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getAllOrders().then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                result.data[0].name.should.be.equal('Water Bottle');
                result.data[0].price.should.be.equal(150);
                result.data[0]._id.should.be.equal('5c63a27345a37036e8c92cf9');
                result.data[0].category.should.be.equal('beverage');
                done();
            }).catch(done.fail);
        });


        it('should return a null response if no orders are available in the database', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const populateMock = {
                populate: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const populateStub = sinon.stub(populateMock, 'populate');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(populateMock);

            populateStub.returns(execMock);

            execStub.resolves(null);

            messageStub.returns({
                success: true,
                data: null
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getAllOrders().then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                done();
            }).catch(done.fail);
        });


        it('should return throw an error when an error occurs while executing the getAllOrders query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const populateMock = {
                populate: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const populateStub = sinon.stub(populateMock, 'populate');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(populateMock);

            populateStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.getAllOrders().then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                done();
            }).catch(done.fail);
        });
    });


    describe('orderService updateOrder test suite', () => {
        it('should update an order successfully', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                updateOne: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const updateFieldsMock = {
                totalPrice: 1000
            };

            const queryStub = sinon.stub(queryMock, 'updateOne');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(execMock);

            execStub.resolves({ data: 'successfully-updated-test-data' });

            messageStub.returns({
                success: true,
                data: 'successfully-updated-test-data'
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.updateOrder('123', updateFieldsMock).then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                done();
            }).catch(done.fail);
        });


        it('should return throw an error when an error occurs while executing the updateOrder query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                updateOne: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const updateFieldsMock = {
                totalPrice: 1000
            };

            const queryStub = sinon.stub(queryMock, 'updateOne');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.updateOrder('123', updateFieldsMock).then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                done();
            }).catch(done.fail);
        });
    });


    describe('orderService getOrdersByCreator test suite', () => {
        it('should return the orders created by the given userId', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const populateMock = {
                populate: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const orderDataMock = [
                {
                    _id: '5c75f730e306193d96b80c56',
                    items: [
                        {
                            quantity: 4,
                            _id: '5c9246b88b7b9a1f5392d8a9',
                            product: {
                                _id: '5c63a29f45a37036e8c92cfa',
                                name: 'French-Fries',
                                price: 150,
                                category: 'food',
                                __v: 0
                            }
                        },
                        {
                            quantity: 2,
                            _id: '5c9246b88b7b9a1f5392d8a8',
                            product: {
                                _id: '5c63a2be45a37036e8c92cfb',
                                name: 'Chicken Burger',
                                price: 500,
                                category: 'food',
                                __v: 0
                            }
                        },
                        {
                            quantity: 2,
                            _id: '5c9246b88b7b9a1f5392d8a7',
                            product: {
                                _id: '5c63a2c845a37036e8c92cfc',
                                name: 'Vege Burger',
                                price: 400,
                                category: 'food',
                                __v: 0
                            }
                        },
                        {
                            quantity: 1,
                            _id: '5c9246b88b7b9a1f5392d8a6',
                            product: {
                                _id: '5c63a46c78828f37a707c55b',
                                name: 'Chicken Submarine',
                                price: 400,
                                category: 'food',
                                __v: 0
                            }
                        }
                    ],
                    status: 'open',
                    customer: 'Table 6',
                    totalPrice: 2700,
                    creator: '5c62e636694ff510c4f4ed52',
                    time: '2019-02-27T02:34:24.215Z',
                    __v: 0
                }
            ];

            const queryStub = sinon.stub(queryMock, 'find');
            const populateStub = sinon.stub(populateMock, 'populate');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(populateMock);

            populateStub.returns(execMock);

            execStub.resolves(orderDataMock);

            messageStub.returns({
                success: true,
                data: orderDataMock
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getOrdersByCreator('123').then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                result.data[0]._id.should.be.equal('5c75f730e306193d96b80c56');
                result.data[0].items[0].quantity.should.be.equal(4);
                result.data[0].status.should.be.equal('open');
                result.data[0].customer.should.be.equal('Table 6');
                done();
            }).catch(done.fail);
        });


        it('should return a null object if no orders are found for the given userid', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const populateMock = {
                populate: () => {

                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const populateStub = sinon.stub(populateMock, 'populate');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(populateMock);

            populateStub.returns(execMock);

            execStub.resolves(null);

            messageStub.returns({
                success: true,
                data: []
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getOrdersByCreator('123').then((result, err) => {
                should.not.exists(err);
                should.exists(result);
                result.success.should.be.equal(true);
                done();
            }).catch(done.fail);
        });


        it('should return throw an error when an error occurs while executing the getOrdersByCreator query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const populateMock = {
                populate: () => {

                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const populateStub = sinon.stub(populateMock, 'populate');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(populateMock);

            populateStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/orderService', {
                '../models/order': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.getOrdersByCreator('123').then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                err.message.should.be.equal(ErrorConstants.DATABASE_ERROR.MESSAGE);
                err.code.should.be.equal(ErrorConstants.DATABASE_ERROR.CODE);
                done();
            }).catch(done.fail);
        });
    });
});
