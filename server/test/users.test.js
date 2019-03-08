
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const should = require('should');
const request = require('supertest');
const HttpStatus = require('http-status-codes');
const ErrorMessages = require('../api/errorConstants');




describe("Testing API calls for the resource 'user'", function () {
    let sandbox;

    afterEach(function () {
        sandbox.restore();
    });

    before(function () {
        sandbox = sinon.sandbox.create();
    });


    it("should return succesfully log-in a user with valid credentials", function (done) {
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
            {
                "_id": "5c62e636694ff510c4f4ed52",
                "username": "abc",
                "email": "abcd@123.com",
                "password": "$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2",
                "__v": 0
            }

        ]));

        mockBcrypt.returns(() => {
            return true
        });

        let user = proxyquire('../api/controllers/users',
            { '../services/userService': userServiceMock });

        let encrypt = proxyquire('../api/controllers/users',
            { 'bcrypt': bcryptMock });
;

        let userRoutes = proxyquire('../api/routes/users',
            { '../controllers/users': user});

        let app = proxyquire('../app', { './api/routes/users': userRoutes });
        
        request(app).post('/users/login')
            .expect(HttpStatus.OK).end((err, res) => {
            should.not.exist(err);
            res.body.data._id.should.be.equal("5c62e636694ff510c4f4ed52");
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

        let user = proxyquire('../api/controllers/users',
            { '../services/userService': userServiceMock });

        let encrypt = proxyquire('../api/controllers/users',
            { 'bcrypt': bcryptMock });
        ;

        let userRoutes = proxyquire('../api/routes/users',
            { '../controllers/users': user});

        let app = proxyquire('../app', { './api/routes/users': userRoutes });

        request(app).post('/users/login')
            .expect(HttpStatus.UNAUTHORIZED).end((err, res) => {
            should.not.exist(err);
            done();
        });


        //correct email invalid password
        // internal server error
    });




})