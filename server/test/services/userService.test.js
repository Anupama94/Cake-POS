const proxyquire = require('proxyquire');
const sinon = require('sinon');
const should = require('should');
const ErrorConstants = require('../../api/errorConstants');


describe('userService test suite', () => {
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

    describe('userService getUser test suite', () => {
        it('should return the user-details of the given user-id', (done) => {
            const queryMock = {
                find: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const execStub = sinon.stub(execMock, 'exec');

            queryStub.returns(execMock);

            execStub.resolves({
                _id: '5c62e636694ff510c4f4ed52',
                username: 'abc',
                email: 'abcd@123.com',
                password: '$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2',
                __v: 0
            });


            const findMock = proxyquire('../../api/services/userService', {
                '../models/user': queryMock
            });

            findMock.getUser('abcd@123.com').then((result, err) => {
                should.not.exists(err);
                result._id.should.be.equal('5c62e636694ff510c4f4ed52');
                result.username.should.be.equal('abc');
                result.email.should.be.equal('abcd@123.com');
                result.password.should.be.equal('$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2');
                done();
            }).catch(done.fail);
        });


        it('should return throw an error when an error occurs while executing the query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/userService', {
                '../models/user': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.getUser('abcd@123.com').then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                err.message.should.be.equal(ErrorConstants.DATABASE_ERROR.MESSAGE);
                err.code.should.be.equal(ErrorConstants.DATABASE_ERROR.CODE);
                done();
            }).catch(done.fail);
        });
    });


    describe('userService checkUserExists test suite', () => {
        it('should return the user-details of the given user-email', (done) => {
            const queryMock = {
                find: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const execStub = sinon.stub(execMock, 'exec');

            queryStub.returns(execMock);

            execStub.resolves({
                _id: '5c62e636694ff510c4f4ed52',
                username: 'abc',
                email: 'abcd@123.com',
                password: '$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2',
                __v: 0
            });


            const findMock = proxyquire('../../api/services/userService', {
                '../models/user': queryMock
            });

            findMock.checkUserExists('abcd@123.com').then((result, err) => {
                should.not.exists(err);
                result._id.should.be.equal('5c62e636694ff510c4f4ed52');
                result.username.should.be.equal('abc');
                result.email.should.be.equal('abcd@123.com');
                result.password.should.be.equal('$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2');
                done();
            }).catch(done.fail);
        });


        it('should return throw an error when an error occurs while executing the checkUserExists query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/userService', {
                '../models/user': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.checkUserExists('abcd@123.com').then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                err.message.should.be.equal(ErrorConstants.DATABASE_ERROR.MESSAGE);
                err.code.should.be.equal(ErrorConstants.DATABASE_ERROR.CODE);
                done();
            }).catch(done.fail);
        });
    });


    describe('userService getAllUsers test suite', () => {
        it('should return all users and their details', (done) => {
            const queryMock = {
                find: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const execStub = sinon.stub(execMock, 'exec');

            queryStub.returns(execMock);

            execStub.resolves([{
                _id: '5c62e636694ff510c4f4ed52',
                username: 'abc',
                email: 'abcd@123.com',
                password: '$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2',
                __v: 0
            }]);


            const findMock = proxyquire('../../api/services/userService', {
                '../models/user': queryMock
            });

            findMock.getAllUsers('abcd@123.com').then((result, err) => {
                should.not.exists(err);
                result[0]._id.should.be.equals('5c62e636694ff510c4f4ed52');
                result[0].username.should.be.equals('abc');
                result[0].email.should.be.equals('abcd@123.com');
                result[0].password.should.be.equals('$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2');
                done();
            }).catch(done.fail);
        });


        it('should return throw an error when an error occurs while executing the getAllUsers query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                find: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'find');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/userService', {
                '../models/user': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.getAllUsers('abcd@123.com').then((err, result) => {
                should.exists(err);
                should.not.exists(result);
                err.success.should.be.equal(false);
                err.message.should.be.equal(ErrorConstants.DATABASE_ERROR.MESSAGE);
                err.code.should.be.equal(ErrorConstants.DATABASE_ERROR.CODE);
                done();
            }).catch(done.fail);
        });
    });


    describe('itemService deleteUser test suite', () => {
        it('should successfully delete a user', (done) => {
            const queryMock = {
                remove: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'remove');
            const execStub = sinon.stub(execMock, 'exec');

            queryStub.returns(execMock);

            execStub.resolves({
                data: 'successfully-deleted-test-data'
            });

            const deleteMock = proxyquire('../../api/services/userService', {
                '../models/user': queryMock
            });

            deleteMock.deleteUser('123').then((result, err) => {
                should.not.exists(err);
                result.data.should.be.equal('successfully-deleted-test-data');
                done();
            }).catch(done.fail);
        });


        it('should throw an error when an error occurs while executing the query', (done) => {
            const returnErrorMessageMock = {
                error: () => {
                }
            };
            const queryMock = {
                remove: () => {
                }
            };

            const execMock = {
                exec: () => {
                }
            };

            const queryStub = sinon.stub(queryMock, 'remove');
            const execStub = sinon.stub(execMock, 'exec');
            const messageStub = sinon.stub(returnErrorMessageMock, 'error');

            queryStub.returns(execMock);

            execStub.rejects({ error: 'error-object' });

            messageStub.returns({
                success: false,
                message: ErrorConstants.DATABASE_ERROR.MESSAGE,
                code: ErrorConstants.DATABASE_ERROR.CODE
            });

            const findMock = proxyquire('../../api/services/userService', {
                '../models/user': queryMock,
                '../messages': returnErrorMessageMock
            });

            findMock.deleteUser('123').then((err, result) => {
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
