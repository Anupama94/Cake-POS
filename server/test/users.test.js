
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const should = require('should');
const request = require('supertest');
const HttpStatus = require('http-status-codes');
const ErrorMessages = require('../api/errorConstants');




describe("Testing API calls for the resource 'user'", function () {
    let sandbox;
    let globalConfigMock;
    let bcryptCompareStub;

    afterEach(function () {
        sandbox.restore();
        bcryptCompareStub.restore();
        globalConfigMock = Object.assign({}, global.config);
        global.config = { mongodb: {connectionString: ''}};
    });

    before(function () {
        sandbox = sinon.sandbox.create();
        const bcrypt = require('bcrypt');
        bcryptCompareStub = sinon.stub(bcrypt, 'compare');
        global.config = globalConfigMock;
    });


    it("should return succesfully log-in a user with valid credentials", function (done) {
        let userServiceMock = {
            getUser: function () {
            }
        };

        bcryptCompareStub.yields(false, true);
        let jwt = require('jsonwebtoken');
        let jwtMock = sinon.stub(jwt, 'sign').callsFake(function() {
            return ({
                email: "abcd@123.com",
                userId: "5c62e636694ff510c4f4ed52"
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "24h"
                });

        });

        let mockItem = sandbox.stub(userServiceMock, 'getUser');

        mockItem.returns(Promise.resolve([
            {
                "_id": "5c62e636694ff510c4f4ed52",
                "username": "abc",
                "email": "abcd@123.com",
                "password": "$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2",
                "__v": 0
            }

        ]));



        let user = proxyquire('../api/controllers/userController',
            { '../services/userService': userServiceMock });

        let userRoutes = proxyquire('../api/routes/userRoute',
            { '../controllers/userController': user});

        let app = proxyquire('../app', { './api/routes/userRoute': userRoutes });
        
        request(app).post('/users/login')
            .expect(HttpStatus.OK).end((err, res) => {
            should.not.exist(err);
            res.body.id.should.be.equal("5c62e636694ff510c4f4ed52");
            res.body.message.should.be.equal("Auth successful");
            done();
        });
    });


    it("should return unauthorized error if a user attempts to login with an invalid email", function (done) {
        let userServiceMock = {
            getUser: function () {

            }
        };

        let bcryptMock = {
            bcrypt: function () {

            }
        }
        let mockItem = sandbox.stub(userServiceMock, 'getUser');
        let mockBcrypt = sandbox.stub(bcryptMock, 'bcrypt');

        mockItem.returns(Promise.resolve([

        ]));

        mockBcrypt.returns(() => {
            return true
        });

        let user = proxyquire('../api/controllers/userController',
            { '../services/userService': userServiceMock });

        let encrypt = proxyquire('../api/controllers/userController',
            { 'bcrypt': bcryptMock });
        ;

        let userRoutes = proxyquire('../api/routes/userRoute',
            { '../controllers/userController': user});

        let app = proxyquire('../app', { './api/routes/userRoute': userRoutes });

        request(app).post('/users/login')
            .expect(HttpStatus.UNAUTHORIZED).end((err, res) => {
            should.not.exist(err);
            done();
        });

        //correct email invalid password
        // internal server error
    });


    it("should return an error if a user attempts to login with invalid password", function (done) {
        let userServiceMock = {
            getUser: function () {
            }
        };

        bcryptCompareStub.yields(true, false);

        let mockItem = sandbox.stub(userServiceMock, 'getUser');

        mockItem.returns(Promise.resolve([
            {
                "_id": "5c62e636694ff510c4f4ed52",
                "username": "abc",
                "email": "abcd@123.com",
                "password": "$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2",
                "__v": 0
            }

        ]));



        let user = proxyquire('../api/controllers/userController',
            { '../services/userService': userServiceMock });

        let userRoutes = proxyquire('../api/routes/userRoute',
            { '../controllers/userController': user});

        let app = proxyquire('../app', { './api/routes/userRoute': userRoutes });

        request(app).post('/users/login')
            .expect(HttpStatus.UNAUTHORIZED).end((err, res) => {
            should.not.exist(err);
            res.body.message.should.be.equal(ErrorMessages.AUTH_FAILED.MESSAGE);
            res.body.code.should.be.equal(ErrorMessages.AUTH_FAILED.CODE);
            done();
        });
    });




})