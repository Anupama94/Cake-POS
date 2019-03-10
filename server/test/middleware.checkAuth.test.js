
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const should = require('should');
const request = require('supertest');
const HttpStatus = require('http-status-codes');
const ErrorMessages = require('../api/errorConstants');
const express = require('express');


describe('Authentication middleware test', function(){
    let sandbox = null;
    let app;
    let globalConfigMock;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
        app = express();
        globalConfigMock = Object.assign({}, global.config);
        global.config = { mongodb: {connectionString: ''}};
    });

    afterEach(function() {
        sandbox.restore();
        app = null;
        global.config = globalConfigMock;
    });

    it('should pass-through if header has valid token', (done) => {

        let jwt = require('jsonwebtoken');
        let jwtMock = sinon.stub(jwt, 'verify').callsFake(function() {
            return true;

        });

        const {authenticate} = require('../api/middleware/checkAuth');
        app.use(authenticate);
        app.get('/items', (req, res) => res.status(200).send());
        request(app)
            .get('/items')
            .set('authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2RAMTIzLmNvbSIsInVzZXJJZCI6IjVjNjJlNjM2Njk0ZmY1MTBjNGY0ZWQ1MiIsImlhdCI6MTU1MjAzMTk1NywiZXhwIjoxNTUyMTE4MzU3fQ.jl8YsDn06-Wwcy6b-ARGqQmxNwtTxM34d6G9fHORxso")
            .expect(200)
            .end((err) => {
                should.not.exist(err);
                done();
            });
    });
});




