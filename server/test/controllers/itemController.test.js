const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const request = require('supertest');
const HttpStatus = require('http-status-codes');
const ErrorMessages = require('../../api/errorConstants');
const CheckAuth = require('../../api/middleware/checkAuth');

const should = chai.should();

describe("Testing API calls for the resource 'item'", () => {
    let sandbox;
    let globalConfigMock;
    let checkAuthStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        checkAuthStub = sinon.stub(CheckAuth, 'authenticate')
            .callsFake((req, res, next) => {
                next();
            });

        globalConfigMock = Object.assign({}, global.config);
        global.config = { mongodb: { connectionString: '' } };
    });

    afterEach(() => {
        sandbox.restore();
        checkAuthStub.restore();
        global.config = globalConfigMock;
    });

    it('should return an item for given item_id', (done) => {
        const itemServiceMock = {
            getItemById: () => { }
        };
        const mockItem = sandbox.stub(itemServiceMock, 'getItemById');

        mockItem.returns(Promise.resolve({
            success: true,
            data: {
                id: '5c756d337e474030ee917cea',
                items: [
                    {
                        quantity: 1,
                        id: '5c756d337e474030ee917cea',
                        product: {
                            id: '5c63a29f45a37036e8c92cfa',
                            name: 'French-Fries',
                            price: 150,
                            category: 'food'
                        }
                    }
                ],
                status: 'closed',
                customer: 'Table 5',
                totalPrice: 2180
            }
        }));

        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });

        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).get('/items/5c756d337e474030ee917cea')
            .expect(HttpStatus.OK).end((err, res) => {
                should.not.exist(err);
                res.body.id.should.be.equal('5c756d337e474030ee917cea');
                res.body.items[0].quantity.should.be.equal(1);
                res.body.items[0].product.id.should.be.equal('5c63a29f45a37036e8c92cfa');
                res.body.items[0].product.name.should.be.equal('French-Fries');
                res.body.items[0].product.price.should.be.equal(150);
                res.body.items[0].product.category.should.be.equal('food');
                res.body.status.should.be.equal('closed');
                res.body.customer.should.be.equal('Table 5');
                res.body.totalPrice.should.be.equal(2180);
                done();
            });
    });


    it('should return an internal server error when an error is thrown amidst executng the function', (done) => {
        const itemServiceMock = {
            getItemById: () => {}
        };

        const mockItem = sandbox.stub(itemServiceMock, 'getItemById');

        mockItem.rejects({
            success: false
        });

        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });
        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).get('/items/1')
            .expect(HttpStatus.INTERNAL_SERVER_ERROR).end((err, res) => {
                should.not.exist(err);
                res.body.error.should.be.equal(ErrorMessages.SERVER_ERROR.MESSAGE);
                res.body.code.should.be.equal(ErrorMessages.SERVER_ERROR.CODE);
                done();
            });
    });


    it('should return all items available in the database', (done) => {
        const itemServiceMock = {
            getAllItems: () => {

            }
        };
        const mockItem = sandbox.stub(itemServiceMock, 'getAllItems');

        mockItem.returns(Promise.resolve({
            success: true,
            data: {
                count: 2,
                items: [
                    {
                        name: 'Water Bottle',
                        price: 80,
                        id: '5c63a27345a37036e8c92cf9',
                        category: 'beverage'
                    },
                    {
                        name: 'French-Fries',
                        price: 150,
                        id: '5c63a29f45a37036e8c92cfa',
                        category: 'food'
                    }
                ]
            }
        }));

        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });
        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).get('/items')
            .expect(HttpStatus.OK).end((err, res) => {
                should.not.exist(err);
                res.body.count.should.be.equal(2);
                res.body.items[0].name.should.be.equal('Water Bottle');
                res.body.items[0].price.should.be.equal(80);
                res.body.items[0].id.should.be.equal('5c63a27345a37036e8c92cf9');
                res.body.items[0].category.should.be.equal('beverage');
                res.body.items[1].name.should.be.equal('French-Fries');
                res.body.items[1].price.should.be.equal(150);
                res.body.items[1].id.should.be.equal('5c63a29f45a37036e8c92cfa');
                res.body.items[1].category.should.be.equal('food');
                done();
            });
    });


    it('should return a NOT FOUND error when items are unavailable in the database', (done) => {
        const itemServiceMock = {
            getAllItems: () => {

            }
        };
        const mockItem = sandbox.stub(itemServiceMock, 'getAllItems');

        mockItem.returns(Promise.resolve({
            success: true,
            data: null
        }));

        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });
        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).get('/items')
            .expect(HttpStatus.NOT_FOUND).end((err) => {
                should.not.exist(err);
                done();
            });
    });


    it('should return all items created by the requested user id in the database', (done) => {
        const itemServiceMock = {
            getAllItems: () => {

            }
        };
        const mockItem = sandbox.stub(itemServiceMock, 'getAllItems');

        mockItem.returns(Promise.resolve({
            success: true,
            data: {
                count: 2,
                orders: [
                    {
                        id: '5c6a63a291662738474822d7',
                        items: [
                            {
                                quantity: 5,
                                id: '5c756d337e474030ee917cea',
                                product: {
                                    id: '5c63a29f45a37036e8c92cfa',
                                    name: 'French-Fries',
                                    price: 150,
                                    category: 'food'
                                }
                            },
                            {
                                quantity: 1,
                                id: '5c756d337e474030ee917ce9',
                                product: {
                                    id: '5c63a2be45a37036e8c92cfb',
                                    name: 'Chicken Burger',
                                    price: 450,
                                    category: 'food'
                                }
                            }
                        ],
                        status: 'open',
                        customer: 'Table 6',
                        creator: '5c6f7e3bc65ba5267af2d27f',
                        totalPrice: 5300,
                        time: '2019-02-22T04:44:43.455Z'
                    },
                    {
                        id: '5c75f730e306193d96b80c56',
                        items: [
                            {
                                quantity: 9,
                                _id: '5c75f9c17e41a0420d296235',
                                product: {
                                    _id: '5c63a2c845a37036e8c92cfc',
                                    name: 'Vege Burger',
                                    price: 400,
                                    category: 'food',
                                    __v: 0
                                }
                            }
                        ],
                        status: 'closed',
                        customer: 'Table 6',
                        creator: '5c62e636694ff510c4f4ed52',
                        totalPrice: 5150,
                        time: '2019-02-27T02:54:07.638Z'
                    }
                ]
            }
        }));

        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });
        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).get('/items')
            .expect(HttpStatus.OK).end((err, res) => {
                should.not.exist(err);
                res.body.count.should.be.equal(2);
                res.body.orders[0].id.should.be.equal('5c6a63a291662738474822d7');
                res.body.orders[0].items[0].quantity.should.be.equal(5);
                res.body.orders[0].items[0].id.should.be.equal('5c756d337e474030ee917cea');
                res.body.orders[0].items[0].product.id.should.be.equal('5c63a29f45a37036e8c92cfa');
                res.body.orders[0].items[0].product.name.should.be.equal('French-Fries');
                res.body.orders[0].items[0].product.price.should.be.equal(150);
                res.body.orders[0].items[0].product.category.should.be.equal('food');
                res.body.orders[0].status.should.be.equal('open');
                res.body.orders[0].customer.should.be.equal('Table 6');
                res.body.orders[0].creator.should.be.equal('5c6f7e3bc65ba5267af2d27f');
                res.body.orders[0].totalPrice.should.be.equal(5300);
                res.body.orders[0].time.should.be.equal('2019-02-22T04:44:43.455Z');
                done();
            });
    });


    // it('should successfully create an item', (done) => {
    //     const itemServiceMock = {
    //         createItem: () => { }
    //     };
    //
    //
    //
    //
    //     const mockItem = sandbox.stub(itemServiceMock, 'createItem');
    //     const mockValidateItem = sinon.stub(itemValidation, 'validateItemCreation');
    //
    //     mockItem.returns(Promise.resolve({
    //         success: true,
    //         data: {
    //             id: '5c756d337e474030ee917cea',
    //             items: [
    //                 {
    //                     quantity: 1,
    //                     id: '5c756d337e474030ee917cea',
    //                     product: {
    //                         id: '5c63a29f45a37036e8c92cfa',
    //                         name: 'French-Fries',
    //                         price: 150,
    //                         category: 'food'
    //                     }
    //                 }
    //             ],
    //             status: 'closed',
    //             customer: 'Table 5',
    //             totalPrice: 2180
    //         }
    //     }));
    //
    //     mockValidateItem.callsFake(() => {
    //         return true;
    //     });
    //
    //     mockValidateItem.returns(Promise.resolve(true));
    //
    //     const item = proxyquire('../api/controllers/itemController',
    //         { '../services/itemService': itemServiceMock });
    //
    //     const itemRoutes = proxyquire('../api/routes/itemRoute',
    //         { '../controllers/itemController': item });
    //
    //     const app = proxyquire('../app', { './api/routes/itemRoute': itemRoutes });
    //     request(app).get('/items/5c756d337e474030ee917cea')
    //         .expect(HttpStatus.CREATED).end((err, res) => {
    //         should.not.exist(err);
    //         done();
    //     });
    // });

    it('should successfully delete an item', (done) => {
        const itemServiceMock = {
            deleteItem: () => { }
        };

        const mockItem = sandbox.stub(itemServiceMock, 'deleteItem');

        mockItem.returns(Promise.resolve({
            success: true,
            data: { test: 'test-data', deletedCount: 1 }
        }));


        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });

        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).delete('/items/5c756d337e474030ee917cea')
            .expect(HttpStatus.OK).end((err, res) => {
                should.not.exist(err);
                res.body.success.should.be.equal(true);
                res.body.data.test.should.be.equal('test-data');
                done();
            });
    });


    it('if an item is not found by the given id a NOT_FOUND error should be sent', (done) => {
        const itemServiceMock = {
            deleteItem: () => { }
        };

        const mockItem = sandbox.stub(itemServiceMock, 'deleteItem');

        mockItem.returns(Promise.resolve({
            success: true,
            data: { test: 'test', deletedCount: 0 }
        }));


        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });

        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).delete('/items/5c756d337e474030ee917cea')
            .expect(HttpStatus.NOT_FOUND).end((err, res) => {
                should.not.exist(err);
                res.body.success.should.be.equal(false);
                res.body.message.should.be.equal(ErrorMessages.ITEM_UNAVAILABLE.MESSAGE);
                res.body.code.should.be.equal(ErrorMessages.ITEM_UNAVAILABLE.CODE);
                done();
            });
    });


    it('if the db throws an error while deleting the item, an INTERNAL_SERVER_ERROR response should be sent back', (done) => {
        const itemServiceMock = {
            deleteItem: () => { }
        };

        const mockItem = sandbox.stub(itemServiceMock, 'deleteItem');

        mockItem.rejects({
            err: { test: 'test', deletedCount: 0 }
        });


        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });

        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).delete('/items/5c756d337e474030ee917cea')
            .expect(HttpStatus.INTERNAL_SERVER_ERROR).end(() => {
                done();
            });
    });


    it('should update an item successfully', (done) => {
        const itemServiceMock = {
            updateItem: () => { }
        };

        const mockItem = sandbox.stub(itemServiceMock, 'updateItem');

        mockItem.rejects({
            success: true
        });


        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });

        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).put('/items/5c756d337e474030ee917cea')
            .expect(HttpStatus.OK).end(() => {
                done();
            });
    });

    it('if the db throws an error while updating the item, an INTERNAL_SERVER_ERROR response should be sent back', (done) => {
        const itemServiceMock = {
            updateItem: () => { }
        };

        const mockItem = sandbox.stub(itemServiceMock, 'updateItem');

        mockItem.rejects({
            success: true
        });


        const item = proxyquire('../../api/controllers/itemController',
            { '../services/itemService': itemServiceMock });

        const itemRoutes = proxyquire('../../api/routes/itemRoute',
            { '../controllers/itemController': item });

        const app = proxyquire('../../app', { './api/routes/itemRoute': itemRoutes });
        request(app).put('/items/5c756d337e474030ee917cea')
            .expect(HttpStatus.INTERNAL_SERVER_ERROR).end(() => {
                done();
            });
    });
});
