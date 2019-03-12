const sinon = require('sinon');
const should = require('should');
const request = require('supertest');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const express = require('express');
const { authenticate } = require('../api/middleware/checkAuth');

describe('Authentication middleware test', () => {
    let sandbox = null;
    let app;
    let globalConfigMock;
    let jwtMock;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        app = express();
        globalConfigMock = Object.assign({}, global.config);
        global.config = { mongodb: { connectionString: '' } };
        jwtMock = sinon.stub(jwt, 'verify');
    });

    afterEach(() => {
        sandbox.restore();
        app = null;
        global.config = globalConfigMock;
        jwtMock.restore();
    });

    it('should pass-through if header has valid token', (done) => {
        jwtMock.callsFake(() => {
            return true;
        });
        app.use(authenticate);
        app.get('/items', (req, res) => res.status(200).send());
        request(app)
            .get('/items')
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2RAMTIzLmNvbSIsInVzZXJJZCI6IjVjNjJlNjM2Njk0ZmY1MTBjNGY0ZWQ1MiIsImlhdCI6MTU1MjAzMTk1NywiZXhwIjoxNTUyMTE4MzU3fQ.jl8YsDn06-Wwcy6b-ARGqQmxNwtTxM34d6G9fHORxso')
            .expect(200)
            .end((err) => {
                should.not.exist(err);
                done();
            });
    });


    it('should not pass-through if header has invalid token', (done) => {
        jwtMock.callsFake(() => {
            return false;
        });

        app.use(authenticate);
        app.get('/items', (req, res) => res.status(HttpStatus.UNAUTHORIZED).send());
        request(app)
            .get('/items')
            .set('authorization', 'Bearer invalid-token')
            .expect(HttpStatus.UNAUTHORIZED)
            .end((err) => {
                should.not.exist(err);
                done();
            });
    });
});
