// var assert = require("assert"); // core module
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var server = require('../app');
// var should = chai.should();

// chai.use(chaiHttp);


// describe('Blobs', function() {
//     it('should list ALL blobs on /blobs GET', function(done) {
//         chai.request(server)
//           .get('/users')
//           .end(function(err, res){
//             res.should.be.json;
//             res.should.have.status(200);
            
//             done();
//           });
//       });
    
//   });

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
        let mockItem = sandbox.stub(userServiceMock, 'getUser')

        mockItem.returns(Promise.resolve({
            success: true,
            data: {
                "_id": "5c62e636694ff510c4f4ed52",
                "username": "abc",
                "email": "abcd@123.com",
                "password": "$2b$10$HdOpKavA/NYNAMb2GFu3oufSGYRzDKtsKYspbEgsyf/Amnc2lEbd2",
                "__v": 0
            }
        }));

        let user = proxyquire('../api/controllers/users',
            { '../services/userService': userServiceMock });

        let userRoutes = proxyquire('../api/routes/users',
            { '../controllers/users': user })

        let app = proxyquire('../app', { './api/routes/users': userRoutes });
        request(app).post('/users/login')
            .expect(HttpStatus.OK).end((err, res) => {
            should.not.exist(err);
            res.body.data._id.should.be.equal("5c62e636694ff510c4f4ed52");
            done();
        });
    });





})