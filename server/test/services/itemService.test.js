const proxyquire = require('proxyquire');
const sinon = require('sinon');
const should = require('should');
const ErrorConstants = require('../../api/errorConstants');


describe('itemService test suite', () => {
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

    describe('itemService getItemById test suite', () => {
        it('should return the item given the item id', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                findById: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'findById');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(execMock);

            execStub.resolves({
                name: 'Water Bottle',
                price: 150,
                _id: '5c63a27345a37036e8c92cf9',
                category: 'beverage'
            });

            messageStub.returns({
                success: true,
                data: [{
                    name: 'Water Bottle',
                    price: 150,
                    _id: '5c63a27345a37036e8c92cf9',
                    category: 'beverage'
                }]
            });

            const findMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getItemById('123').then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                result.data[0].name.should.be.equal('Water Bottle');
                result.data[0].price.should.be.equal(150);
                result.data[0]._id.should.be.equal('5c63a27345a37036e8c92cf9');
                result.data[0].category.should.be.equal('beverage');
                done();
            }).catch(done.fail);
        });


        it('should return a null object if an item by the given id is not available', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                findById: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'findById');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(execMock);

            execStub.resolves(null);

            messageStub.returns({
                success: true,
                data: null
            });

            const findMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getItemById('invalid-id').then((result, err) => {
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

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'findById');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.getItemById('123').then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                err.message.should.be.equal(ErrorConstants.DATABASE_ERROR.MESSAGE);
                err.code.should.be.equal(ErrorConstants.DATABASE_ERROR.CODE);
                done();
            }).catch(done.fail);
        });
    });


    describe('itemService getAllItems test suite', () => {
        it('should return all items successfully', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const selectMock = {
                select: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const selectStub = sinon.stub(selectMock, 'select');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(selectMock);

            selectStub.returns(execMock);

            execStub.resolves([{
                name: 'Water Bottle',
                price: 150,
                _id: '5c63a27345a37036e8c92cf9',
                category: 'beverage'
            }]);

            messageStub.returns({
                success: true,
                data: {
                    name: 'Water Bottle',
                    price: 150,
                    _id: '5c63a27345a37036e8c92cf9',
                    category: 'beverage'
                }
            });

            const findMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getAllItems().then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                result.data.name.should.be.equal('Water Bottle');
                result.data.price.should.be.equal(150);
                result.data._id.should.be.equal('5c63a27345a37036e8c92cf9');
                result.data.category.should.be.equal('beverage');
                done();
            }).catch(done.fail);
        });


        it('should return a null response if no items are available in teh database', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const selectMock = {
                select: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const selectStub = sinon.stub(selectMock, 'select');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(selectMock);

            selectStub.returns(execMock);

            execStub.resolves(null);

            messageStub.returns({
                success: true,
                data: null
            });

            const findMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.getAllItems().then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                done();
            }).catch(done.fail);
        });

        it('should return throw an error when an error occurs while executing thegetAllItems query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const selectMock = {
                select: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const selectStub = sinon.stub(selectMock, 'select');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(selectMock);

            selectStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.getAllItems().then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                done();
            }).catch(done.fail);
        });
    });


    describe('itemService deleteItem test suite', () => {
        it('should successfully delete an item', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                deleteOne: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'deleteOne');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(execMock);

            execStub.resolves({
                data: 'successfully-deleted-test-data'
            });

            messageStub.returns({
                success: true,
                data: 'successfully-deleted-test-data'
            });

            const createMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnSuccessMessageMock
            });

            createMock.deleteItem('123').then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                done();
            }).catch(done.fail);
        });


        it('should throw an error when an error occurs while executing the query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                deleteOne: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'deleteOne');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.deleteItem('123').then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                done();
            }).catch(done.fail);
        });
    });


    describe('itemService updateItem test suite', () => {
        it('should update an item successfully', (done) => {
            const returnSuccessMessageMock = {
                success: () => {
                }
            };
            const queryMock = {
                update: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const requestMock = {
                params: {
                    itemId: '123'
                },
                body: {
                    price: 50
                }
            };

            const queryStub = sinon.stub(queryMock, 'update');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnSuccessMessageMock, 'success');

            queryStub.returns(execMock);

            execStub.resolves({ data: 'successfully-updated-test-data' });

            messageStub.returns({
                success: true,
                data: 'successfully-updated-test-data'
            });

            const findMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnSuccessMessageMock
            });

            findMock.updateItem(requestMock).then((result, err) => {
                should.not.exists(err);
                result.success.should.be.equal(true);
                done();
            }).catch(done.fail);
        });


        it('should return throw an error when an error occurs while executing the updateItem query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                update: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const requestMock = {
                params: {
                    itemId: '123'
                },
                body: {
                    price: 50
                }
            };

            const queryStub = sinon.stub(queryMock, 'update');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/itemService', {
                '../models/item': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.updateItem(requestMock).then((err, result) => {
                should.exists(err);
                should.not.exist(result);
                err.success.should.be.equal(false);
                done();
            }).catch(done.fail);
        });
    });
});
