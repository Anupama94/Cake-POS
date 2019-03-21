const proxyquire = require('proxyquire');
const sinon = require('sinon');
const should = require('should');
const request = require('supertest');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ErrorMessages = require('../../api/errorConstants');


describe("Testing API calls for the resource 'user'", () => {
    let sandbox;
    let globalConfigMock;
    let bcryptCompareStub;

    afterEach(() => {
        sandbox.restore();
        bcryptCompareStub.restore();
        global.config = globalConfigMock;
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        bcryptCompareStub = sinon.stub(bcrypt, 'compare');


        globalConfigMock = Object.assign({}, global.config);
        global.config = { mongodb: { connectionString: '' } };
    });


    it('should return succesfully log-in a user with valid credentials', (done) => {
        const userServiceMock = {
            getUser: () => {
            }
        };

        bcryptCompareStub.yields(false, true);
        sinon.stub(jwt, 'sign').callsFake(() => {
            return ({
                email: 'abcd@123.com',
                userId: '5c62e636694ff510c4f4ed52'
            },
            process.env.JWT_KEY,
            {
                expiresIn: '24h'
            });
        });

        const mockItem = sandbox.stub(userServiceMock, 'getUser');

        mockItem.returns(Promise.resolve([
            {
                _id: '5c62e636694ff510c4f4ed52',
                username: 'abc',
                email: 'abcd@123.com',
                password: '$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2',
                __v: 0
            }
        ]));

        const user = proxyquire('../../api/controllers/userController',
            { '../services/userService': userServiceMock });

        const userRoutes = proxyquire('../../api/routes/userRoute',
            { '../controllers/userController': user });

        const app = proxyquire('../../app', { './api/routes/userRoute': userRoutes });

        request(app).post('/users/login')
            .expect(HttpStatus.OK).end((err, res) => {
                should.not.exist(err);
                res.body.id.should.be.equal('5c62e636694ff510c4f4ed52');
                res.body.message.should.be.equal('Auth successful');
                done();
            });
    });


    it('should return unauthorized error if a user attempts to login with an invalid email', (done) => {
        const userServiceMock = {
            getUser: () => {

            }
        };

        const bcryptMock = {
            bcrypt: () => {

            }
        };

        const mockItem = sandbox.stub(userServiceMock, 'getUser');
        const mockBcrypt = sandbox.stub(bcryptMock, 'bcrypt');

        mockItem.returns(Promise.resolve([

        ]));

        mockBcrypt.returns(() => {
            return true;
        });

        const user = proxyquire('../../api/controllers/userController',
            { '../services/userService': userServiceMock });

        proxyquire('../../api/controllers/userController',
            { bcrypt: bcryptMock });

        const userRoutes = proxyquire('../../api/routes/userRoute',
            { '../controllers/userController': user });

        const app = proxyquire('../../app', { './api/routes/userRoute': userRoutes });

        request(app).post('/users/login')
            .expect(HttpStatus.UNAUTHORIZED).end((err) => {
                should.not.exist(err);
                done();
            });
    });


    it('should return an error if a user attempts to login with invalid password', (done) => {
        const userServiceMock = {
            getUser: () => {
            }
        };

        bcryptCompareStub.yields(true, false);

        const mockItem = sandbox.stub(userServiceMock, 'getUser');

        mockItem.returns(Promise.resolve([
            {
                _id: '5c62e636694ff510c4f4ed52',
                username: 'abc',
                email: 'abcd@123.com',
                password: '$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2',
                __v: 0
            }

        ]));

        const user = proxyquire('../../api/controllers/userController',
            { '../services/userService': userServiceMock });

        const userRoutes = proxyquire('../../api/routes/userRoute',
            { '../controllers/userController': user });

        const app = proxyquire('../../app', { './api/routes/userRoute': userRoutes });

        request(app).post('/users/login')
            .expect(HttpStatus.UNAUTHORIZED).end((err, res) => {
                should.not.exist(err);
                res.body.message.should.be.equal(ErrorMessages.AUTH_FAILED.MESSAGE);
                res.body.code.should.be.equal(ErrorMessages.AUTH_FAILED.CODE);
                done();
            });
    });
});
